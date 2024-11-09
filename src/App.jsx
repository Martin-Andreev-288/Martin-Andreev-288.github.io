import React from "react";
import formJSON from "./formData.json";
import DynamicFormBuilder from "./DynamicFormBuilder";

class App extends React.Component {
  handleSubmit = (data) => {
    console.log(data);
  };

  render() {
    return (
      <div className="container">
        <h1>Dynamic Form Builder</h1>
        <DynamicFormBuilder formJSON={formJSON} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default App;
