const ErrorMessage = ({ error }) => {
  return error ? <div className="error">{error}</div> : null;
};

export default ErrorMessage;
