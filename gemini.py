import google.generativeai as genai
genai.configure(api_key="AIzaSyBzoFM1RecRFQhJCFCT_O8m_9kgB9t_OYw")

from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os

from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langcbain.vectorstores import FAISS

