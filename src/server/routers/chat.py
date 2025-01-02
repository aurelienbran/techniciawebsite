from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models.chat import ChatMessage, ChatResponse
from services.claude import ClaudeService
from services.vector_search import VectorSearchService

router = APIRouter()
claude_service = ClaudeService()
vector_service = VectorSearchService()

@router.post("/", response_model=ChatResponse)
async def process_message(message: ChatMessage):
    try:
        # Search for relevant documents
        relevant_docs = await vector_service.search(message.content)
        
        # Process with Claude AI
        response = await claude_service.process_message(
            message.content,
            context=relevant_docs
        )
        
        return ChatResponse(
            content=response.content,
            context={
                "type": "maintenance",
                "relatedDocuments": [doc.id for doc in relevant_docs]
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))