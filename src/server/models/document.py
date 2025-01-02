```python
from pydantic import BaseModel, Field
from typing import Dict, Any
from datetime import datetime
from enum import Enum

class DocumentType(str, Enum):
    PDF = "pdf"
    TEXT = "text"
    IMAGE = "image"

    @classmethod
    def from_mime_type(cls, mime_type: str) -> "DocumentType":
        """Convert MIME type to document type."""
        if 'pdf' in mime_type:
            return cls.PDF
        elif 'image' in mime_type:
            return cls.IMAGE
        return cls.TEXT

class Document(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    content: str
    type: DocumentType
    metadata: Dict[str, Any]
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
```