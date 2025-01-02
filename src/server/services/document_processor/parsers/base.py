from abc import ABC, abstractmethod
from fastapi import UploadFile

class BaseParser(ABC):
    """Base class for document parsers."""
    
    requires_ocr: bool = False
    
    @abstractmethod
    async def parse(self, file: UploadFile) -> str:
        """Parse file content."""
        pass