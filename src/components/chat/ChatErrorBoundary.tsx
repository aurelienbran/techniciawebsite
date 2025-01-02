import React, { Component, ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ChatErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Chat error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-4 bg-gray-50">
          <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Chat System Error
          </h3>
          <p className="text-gray-600 text-center mb-4">
            The chat system encountered a technical issue. Please try reloading.
          </p>
          <button
            onClick={this.handleRetry}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Connection
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}