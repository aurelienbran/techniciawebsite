```python
from supabase import create_client
from .settings import Settings

settings = Settings()

# Initialize Supabase client
supabase = create_client(
    settings.supabase_url,
    settings.supabase_key
)

# Initialize Qdrant client
from qdrant_client import QdrantClient
from qdrant_client.http import models

qdrant = QdrantClient(
    host=settings.qdrant_host,
    port=settings.qdrant_port
)

# Create collection if it doesn't exist
try:
    qdrant.create_collection(
        collection_name=settings.qdrant_collection,
        vectors_config=models.VectorParams(
            size=4096,  # Voyage Large 2 embedding size
            distance=models.Distance.COSINE
        )
    )
except Exception:
    # Collection might already exist
    pass
```