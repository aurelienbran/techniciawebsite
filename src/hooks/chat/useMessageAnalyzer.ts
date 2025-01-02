import { useCallback } from 'react';
import { MessageContext } from '../../types/chat';

export function useMessageAnalyzer() {
  const analyzeMessage = useCallback((content: string): MessageContext => {
    // Detect message type based on content
    const types = {
      maintenance: ['repair', 'maintain', 'fix', 'broken', 'maintenance'],
      issue: ['problem', 'issue', 'error', 'fault', 'warning'],
      checklist: ['check', 'verify', 'inspect', 'procedure', 'steps'],
      help: ['help', 'guide', 'how to', 'explain', 'what is'],
    };

    let detectedType: MessageContext['type'] = 'help';
    for (const [type, keywords] of Object.entries(types)) {
      if (keywords.some(keyword => content.toLowerCase().includes(keyword))) {
        detectedType = type as MessageContext['type'];
        break;
      }
    }

    return {
      type: detectedType,
      metadata: {
        timestamp: new Date().toISOString(),
        analyzed: true,
      },
    };
  }, []);

  return {
    analyzeMessage,
  };
}