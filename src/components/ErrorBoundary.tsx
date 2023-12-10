
import React, { ErrorInfo } from 'react'
import { NavLink } from 'react-router-dom'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col gap-4">
          <NavLink to={`/`}>Back to Character Selection</NavLink>
          <h1>Something went wrong.</h1>
          <p>{this.state.error?.toString()}</p>
          <p>{this.state.errorInfo?.componentStack}</p>
        </div>
      )
    }

    return this.props.children
  }
}
