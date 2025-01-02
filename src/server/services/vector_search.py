from qdrant_client import QdrantClient
from qdrant_client.http import models
from models.document import Document
from config.settings import Settings

class VectorSearchService:
    def __init__(self):
        self.settings = Settings()
        self.client = QdrantClient(
            host=self.settings.qdrant_host,
            port=self.settings.qdrant_port
        )
        self.collection_name = "maintenance_docs"
    
    async def search(self, query: str, limit: int = 3):
        try:
            # Generate embeddings for query
            query_vector = await self.generate_embeddings(query)
            
            # Search for similar documents
            search_result = self.client.search(
                collection_name=self.collection_name,
                query_vector=query_vector,
                limit=limit
            )
            
            return search_result
        except Exception as e:
            raise Exception(f"Vector search failed: {str(e)}")
    
    async def index_document(self, document: Document):
        try:
            # Generate embeddings
            embeddings = await self.generate_embeddings(document.content)
            
            # Index document
            self.client.upsert(
                collection_name=self.collection_name,
                points=[
                    models.PointStruct(
                        id=document.id,
                        vector=embeddings,
                        payload=document.dict()
                    )
                ]
            )
        except Exception as e:
            raise Exception(f"Document indexing failed: {str(e)}")