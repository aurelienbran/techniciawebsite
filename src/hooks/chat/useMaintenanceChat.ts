import { useCallback } from 'react';
import { Message, MessageContext } from '../../types/chat';
import { MaintenanceRequest } from '../../types/maintenance';

export function useMaintenanceChat() {
  const processMaintenanceMessage = useCallback((
    content: string,
    activeRequest?: MaintenanceRequest
  ): MessageContext => {
    const keywords = {
      status: ['status', 'progress', 'update'],
      create: ['create', 'new', 'start'],
      update: ['change', 'modify', 'update'],
      close: ['close', 'complete', 'finish'],
    };

    let type: MessageContext['type'] = 'maintenance';
    let action: string | undefined;

    // Detect intended action
    for (const [key, phrases] of Object.entries(keywords)) {
      if (phrases.some(phrase => content.toLowerCase().includes(phrase))) {
        action = key;
        break;
      }
    }

    return {
      type,
      metadata: {
        action,
        requestId: activeRequest?.id,
      },
    };
  }, []);

  const formatMaintenanceResponse = useCallback((
    request: MaintenanceRequest
  ): Message['content'] => {
    return `
Maintenance Request Created:
- Title: ${request.title}
- Equipment: ${request.equipment}
- Priority: ${request.priority}
- Status: ${request.status}
- ID: ${request.id}

I'll keep you updated on the progress. You can ask me about the status anytime.
    `.trim();
  }, []);

  return {
    processMaintenanceMessage,
    formatMaintenanceResponse,
  };
}