```python
from typing import Dict, Type
from .base import BaseParser
from .pdf import PDFParser
from .text import TextParser
from .image import ImageParser
from utils.errors import ProcessingError

# Parser registry
PARSERS: Dict[str, Type[BaseParser]] = {
    'application/pdf': PDFParser,
    'text/plain': TextParser,
    'image/png': ImageParser,
    'image/jpeg': ImageParser,
}

def get_parser(mime_type: str) -> BaseParser:
    """Get appropriate parser for file type."""
    parser_class = PARSERS.get(mime_type)
    if not parser_class:
        raise ProcessingError(f"Unsupported file type: {mime_type}")
    return parser_class()
```