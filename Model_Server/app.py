from typing import Union
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
import google.generativeai as genai
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with the domain where your React app is hosted
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

load_dotenv()

class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None



@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.name, "item_id": item_id}



# Configure Google API key
os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

@app.get("/ask")
async def ask_question(user_question: str):
    print(user_question)
    print("=========Hahahaha==========")
    
    try:
        # Load embeddings
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

        # Load FAISS index
        new_db = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)

        # Search for relevant documents
        docs = new_db.similarity_search(user_question)

        # Get conversational chain
        chain = get_conversational_chain()

        # Get response
        response = chain({"input_documents": docs, "question": user_question}, return_only_outputs=True)

        return {"response": response["output_text"]}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def get_pdf_text(pdf_docs):
    text = ""
    for pdf in pdf_docs:
        pdf_reader = PdfReader(pdf)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text

def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    chunks = text_splitter.split_text(text)
    return chunks

def get_vector_store(text_chunks):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
    vector_store.save_local("faiss_index")

def get_conversational_chain():
    prompt_template = """
    Answer the question as detailed as possible from the provided context and knowledge out of it, make sure to provide all the details and try to include emojis, if the answer is not in
    provided context just say, "answer is not available in the context, Please ask a suitable question", don't provide the wrong answer\n\n
    Context:\n {context}?\n
    Question: \n{question}\n

    Answer:
    """
    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)

    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    return chain

def main():
    pdf_docs = ["./ca.pdf"]
    raw_text = get_pdf_text(pdf_docs)
    text_chunks = get_text_chunks(raw_text)
    get_vector_store(text_chunks)
    print("Indexing done")

if __name__ == "__main__":
    main()