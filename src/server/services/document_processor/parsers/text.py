from .base import BaseParser
from fastapi import UploadFile
from utils.errors import ParsingError

class TextParser(BaseParser):
    """Parser for plain text documents."""
    
    async def parse(self, file: UploadFile) -> str:
        try:
            content = await file.read()
            return content.decode('utf-8')
        except Exception as e:
            raise ParsingError(f"Text parsing failed: {str(e)}")