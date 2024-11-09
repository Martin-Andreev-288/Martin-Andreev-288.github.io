import React from "react";
import formJSON from "./config/formData.json";
import DynamicFormBuilder from "./components/DynamicFormBuilder";

class App extends React.Component {
  handleSubmit = (data) => {
    console.log(data);
  };

  render() {
    return (
      <div>
        <h1>Dynamic Form Builder</h1>
        <DynamicFormBuilder formJSON={formJSON} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default App;
