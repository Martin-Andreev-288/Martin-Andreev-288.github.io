import { Component } from 'react';

class ErrorMessage extends Component {
  render() {
    const { error } = this.props;
    return error ? <div className="error">{error}</div> : null;
  }
}

export default ErrorMessage;
