import React, { Component } from 'react'; // Import React and Component from the 'react' library

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false }; // Initialize the state with hasError set to false
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }; // Update the state to indicate an error has occurred
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo); // Log the error and error information
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>; // Render a fallback UI if an error has occurred
    }

    return this.props.children; // Render the children components if no error has occurred
  }
}

export default ErrorBoundary; // Export the ErrorBoundary component as the default export