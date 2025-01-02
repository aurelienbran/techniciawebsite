class AppError(Exception):
    """Base application error."""
    def __init__(self, message: str, code: str = None):
        super().__init__(message)
        self.code = code or self.__class__.__name__

class DocumentError(AppError):
    """Base class for document-related errors."""
    pass

class ProcessingError(DocumentError):
    """Document processing error."""
    pass

class ValidationError(DocumentError):
    """Document validation error."""
    pass

class OCRError(DocumentError):
    """OCR processing error."""
    pass

class ParsingError(DocumentError):
    """Document parsing error."""
    pass