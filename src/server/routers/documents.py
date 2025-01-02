from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List
from models.document import Document, DocumentResponse
from services.document_processor import DocumentProcessor
from services.vector_search import VectorSearchService

router = APIRouter()
doc_processor = DocumentProcessor()
vector_service = VectorSearchService()

@router.post("/upload", response_model=DocumentResponse)
async def upload_document(file: UploadFile = File(...)):
    try:
        # Process document
        document = await doc_processor.process(file)
        
        # Generate embeddings and index
        await vector_service.index_document(document)
        
        return DocumentResponse(
            id=document.id,
            title=document.title,
            type=document.type,
            metadata=document.metadata
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=List[DocumentResponse])
async def get_documents():
    try:
        documents = await doc_processor.get_all()
        return [
            DocumentResponse(
                id=doc.id,
                title=doc.title,
                type=doc.type,
                metadata=doc.metadata
            )
            for doc in documents
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))