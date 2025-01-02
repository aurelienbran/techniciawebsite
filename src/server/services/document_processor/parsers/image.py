from .base import BaseParser
from fastapi import UploadFile
from utils.errors import ParsingError

class ImageParser(BaseParser):
    """Parser for image documents."""
    
    requires_ocr: bool = True
    
    async def parse(self, file: UploadFile) -> bytes:
        try:
            return await file.read()
        except Exception as e:
            raise ParsingError(f"Image parsing failed: {str(e)}")