from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from datetime import datetime

class ChatMessage(BaseModel):
    content: str
    context: Optional[Dict[str, Any]] = None

class ChatResponse(BaseModel):
    id: str
    role: str = "assistant"
    content: str
    timestamp: datetime = datetime.now()
    context: Optional[Dict[str, Any]] = None

class ChatHistory(BaseModel):
    messages: List[ChatMessage]