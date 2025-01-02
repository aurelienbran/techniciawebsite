from fastapi import UploadFile
from typing import Set
from utils.errors import ValidationError

# Configuration
MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
ALLOWED_TYPES: Set[str] = {
    'application/pdf',
    'text/plain',
    'image/png',
    'image/jpeg'
}

async def validate_file(file: UploadFile) -> None:
    """Validate file size and type."""
    # Check file size
    if file.size > MAX_FILE_SIZE:
        raise ValidationError(
            f"File size exceeds maximum limit of {MAX_FILE_SIZE / 1024 / 1024}MB"
        )
    
    # Check file type
    if file.content_type not in ALLOWED_TYPES:
        raise ValidationError(
            f"Unsupported file type: {file.content_type}"
        )