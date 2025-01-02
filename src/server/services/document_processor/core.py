```python
from typing import List, Optional
from fastapi import UploadFile
from .parsers import get_parser
from .validators import validate_file
from .ocr import OCRProcessor
from models.document import Document, DocumentType
from utils.errors import ProcessingError

class DocumentProcessor:
    """Core document processing service."""
    
    def __init__(self):
        self.ocr = OCRProcessor()

    async def process(self, file: UploadFile) -> Document:
        """Process an uploaded document."""
        try:
            # Validate file
            await validate_file(file)
            
            # Get appropriate parser
            parser = get_parser(file.content_type)
            
            # Parse content
            content = await parser.parse(file)
            
            # Perform OCR if needed
            if parser.requires_ocr:
                content = await self.ocr.process(content)

            return Document(
                title=file.filename,
                content=content,
                type=DocumentType.from_mime_type(file.content_type),
                metadata=self._create_metadata(file)
            )
        except Exception as e:
            raise ProcessingError(f"Document processing failed: {str(e)}")

    def _create_metadata(self, file: UploadFile) -> dict:
        """Create document metadata."""
        return {
            'fileSize': file.size,
            'mimeType': file.content_type,
            'processedAt': datetime.now().isoformat()
        }
```