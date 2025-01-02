import pytesseract
from PIL import Image
from io import BytesIO
from utils.errors import OCRError

class OCRProcessor:
    """Handles OCR processing for documents."""
    
    async def process(self, content: bytes) -> str:
        """Process image content with OCR."""
        try:
            image = Image.open(BytesIO(content))
            return pytesseract.image_to_string(image)
        except Exception as e:
            raise OCRError(f"OCR processing failed: {str(e)}")