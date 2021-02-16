import React from 'react';
import { ErrorContext } from '../../context/ErrorContext/ErrorContext';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
  static contextType = ErrorContext;
  context!: React.ContextType<typeof ErrorContext>;

  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  componentDidCatch(error: Error) {
    this.setState({ hasError: true, error });
  }

  render() {
    if (this.state.hasError || this.context.error) {
      return <h1>{this.state.error?.message || this.context.error?.message}</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
