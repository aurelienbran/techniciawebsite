import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { QuickActions } from './QuickActions';

interface MessageContentProps {
  content: string;
  isUser: boolean;
  onActionClick?: (action: string) => void;
}

export const MessageContent: React.FC<MessageContentProps> = ({ 
  content, 
  isUser,
  onActionClick 
}) => {
  return (
    <div className="space-y-4">
      <div className={`prose prose-sm max-w-none ${
        isUser ? 'prose-invert' : ''
      }`}>
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            table: ({ children }) => (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  {children}
                </table>
              </div>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
      
      {!isUser && onActionClick && <QuickActions onActionClick={onActionClick} />}
    </div>
  );
};