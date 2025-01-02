```python
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # API Configuration
    api_version: str = "v1"
    debug: bool = False
    
    # Authentication
    jwt_secret: str
    jwt_algorithm: str = "HS256"
    jwt_expiration: int = 30  # minutes
    
    # Database
    supabase_url: str
    supabase_key: str
    
    # Claude AI
    anthropic_api_key: str
    
    # Vector Database
    qdrant_host: str = "localhost"
    qdrant_port: int = 6333
    qdrant_collection: str = "maintenance_docs"
    
    # Document Processing
    max_file_size: int = 10 * 1024 * 1024  # 10MB
    allowed_file_types: set = {
        'application/pdf',
        'text/plain',
        'image/png',
        'image/jpeg'
    }
    
    # Embeddings
    voyage_api_key: Optional[str] = None
    embedding_model: str = "voyage-large-2"
    
    class Config:
        env_file = ".env"
```