from typing import Optional
import PyPDF2
from io import BytesIO
from .base import BaseParser
from fastapi import UploadFile
from utils.errors import ParsingError

class PDFParser(BaseParser):
    """Parser for PDF documents."""
    
    requires_ocr: bool = False
    
    async def parse(self, file: UploadFile) -> str:
        try:
            content = await file.read()
            pdf_file = BytesIO(content)
            
            reader = PyPDF2.PdfReader(pdf_file)
            text = ""
            
            for page in reader.pages:
                text += page.extract_text() + "\n"
            
            # If no text was extracted, might need OCR
            if not text.strip():
                self.requires_ocr = True
                return content
                
            return text
        except Exception as e:
            raise ParsingError(f"PDF parsing failed: {str(e)}")