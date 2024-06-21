from typing import Union, List
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, File, UploadFile, APIRouter,Request
from fastapi.responses import JSONResponse
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

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

router = APIRouter()

load_dotenv()


@app.get("/")
def read_root():
    return {"Hello2": "World"}


@app.post("/compile")

async def ask_question(request: Request):
    try:
        # Extract text from PDF files
        data= await request.json()
        raw_text = data.get("Pdf_data")

        # Split text into chunks
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
        text_chunks = text_splitter.split_text(raw_text)

        # Load embeddings
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

        # Update FAISS index
        vector_store = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True )#, allow_dangerous_deserialization=True add this argument for older code
        vector_store.add_texts(text_chunks)
        vector_store.save_local("faiss_index")

        return JSONResponse(content={"message": "Index updated successfully - from FAST API"})

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)



@app.get("/ask")
async def ask_question(user_question: str):
    print(user_question)
    print("=========Hahahaha==========")
    
    try:
        # Load embeddings
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

        # Load FAISS index
        new_db = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True) # add this argument for older code

        # Search for relevant documents
        docs = new_db.similarity_search(user_question)

        # Get conversational chain
        chain = get_conversational_chain()

        # Get response
        response = chain({"input_documents": docs, "question": user_question}, return_only_outputs=True)

        return {"response": response["output_text"]}

    except Exception as e:
        print(f"Error: {str(e)}")
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
    If it's a greeting then greet very nicely \n If it's a question then Answer the question as detailed as possible from the provided context and knowledge out of it, make sure to provide all the details and use relatable emojis with texts to answer, if the answer is not in
    provided context just say, "answer is not available in the context, Please ask a suitable question", don't provide the wrong answer. \n\n
    Context:\n {context}?\n
    Question: \n{question}\n

    Answer:
    """
    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)

    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    return chain

def main():
    pdf_docs = ["./230.pdf"]
    raw_text = get_pdf_text(pdf_docs)
    text_chunks = get_text_chunks(raw_text)
    get_vector_store(text_chunks)
    print("Indexing done")

if __name__ == "__main__":
    main()
