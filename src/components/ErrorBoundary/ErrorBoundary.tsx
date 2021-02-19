import React from 'react';
import { ErrorContext } from '../../context/ErrorContext/ErrorContext';
import ErrorWrapper from './ErrorWrapper';

class ErrorBoundary extends React.Component<any, any> {
  static contextType = ErrorContext;
  context!: React.ContextType<typeof ErrorContext>;

  constructor(props: any) {
    super(props);
  }

  componentDidCatch(error: Error) {
    if (this.context.setError) {
      this.context.setError(error);
    }
  }

  render() {
    if (this.context.error) {
      return <ErrorWrapper message={this.context.error?.message} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
