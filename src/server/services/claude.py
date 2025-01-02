import anthropic
from models.chat import ChatMessage, ChatResponse
from config.settings import Settings

class ClaudeService:
    def __init__(self):
        self.settings = Settings()
        self.client = anthropic.Client(api_key=self.settings.anthropic_api_key)
    
    async def process_message(
        self,
        content: str,
        context: list = None
    ) -> ChatResponse:
        try:
            # Format context if available
            context_text = ""
            if context:
                context_text = "Context from relevant documents:\n" + "\n\n".join(
                    [doc.content for doc in context]
                )
            
            # Create prompt with context
            prompt = f"{context_text}\n\nUser question: {content}" if context else content
            
            # Get response from Claude
            response = await self.client.messages.create(
                model="claude-3-sonnet-20240229",
                max_tokens=1024,
                temperature=0.7,
                messages=[{"role": "user", "content": prompt}]
            )
            
            return ChatResponse(
                content=response.content[0].text,
                role="assistant"
            )
        except Exception as e:
            raise Exception(f"Claude AI processing failed: {str(e)}")