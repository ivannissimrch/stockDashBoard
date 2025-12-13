import "./ErrorFallback.css";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  return (
    <div className="error-fallback">
      <h2 className="error-fallback__title">Something went wrong</h2>
      <p className="error-fallback__message">{error.message}</p>
      <button className="error-fallback__button" onClick={resetErrorBoundary}>
        Try Again
      </button>
    </div>
  );
}
