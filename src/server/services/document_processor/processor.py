```python
from typing import List, Optional
from fastapi import UploadFile
from datetime import datetime
from .parsers import PDFParser, TextParser, ImageParser
from .ocr import OCRProcessor
from .validators import DocumentValidator
from models.document import Document, DocumentType
from utils.errors import ProcessingError

class DocumentProcessor:
    """Main document processing service."""
    
    def __init__(self):
        self.validators = DocumentValidator()
        self.parsers = {
            'application/pdf': PDFParser(),
            'text/plain': TextParser(),
            'image/png': ImageParser(),
            'image/jpeg': ImageParser(),
        }
        self.ocr = OCRProcessor()

    async def process(self, file: UploadFile) -> Document:
        """Process an uploaded document."""
        try:
            # Validate file
            await self.validators.validate_file(file)
            
            # Get appropriate parser
            parser = self.parsers.get(file.content_type)
            if not parser:
                raise ProcessingError(f"Unsupported file type: {file.content_type}")

            # Parse content
            content = await parser.parse(file)
            
            # Perform OCR if needed
            if parser.requires_ocr:
                content = await self.ocr.process(content)

            # Create document
            return Document(
                title=file.filename,
                content=content,
                type=self._get_document_type(file.content_type),
                metadata={
                    'fileSize': file.size,
                    'mimeType': file.content_type,
                    'processedAt': datetime.now().isoformat()
                }
            )
        except Exception as e:
            raise ProcessingError(f"Document processing failed: {str(e)}")

    def _get_document_type(self, mime_type: str) -> DocumentType:
        """Map MIME type to document type."""
        if 'pdf' in mime_type:
            return DocumentType.PDF
        elif 'image' in mime_type:
            return DocumentType.IMAGE
        return DocumentType.TEXT
```