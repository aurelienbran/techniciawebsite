export type MessageRole = 'user' | 'assistant';
export type MessageStatus = 'sending' | 'sent' | 'error';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  status?: MessageStatus;
  context?: MessageContext;
}

export interface MessageContext {
  type: 'maintenance' | 'issue' | 'checklist' | 'help';
  relatedDocuments?: string[];
  previousRequestId?: string;
  metadata?: Record<string, unknown>;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  context: {
    currentTopic?: string;
    activeRequest?: string;
    relatedDocuments: string[];
  };
}