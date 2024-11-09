import { Component } from "react";
import FormField from "./FormField";

class DynamicFormBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     formData: {},
  //     errors: {},
  //   };
  // }
  state = {
    formData: {},
    errors: {},
  };

  // Handle change for form inputs
  handleChange = (id, value) => {
    this.setState((prevState) => {
      const updatedFormData = { ...prevState.formData, [id]: value };
      const updatedErrors = this.validateField(id, value);
      return {
        formData: updatedFormData,
        errors: { ...prevState.errors, ...updatedErrors },
      };
    });
  };

  // Validation function
  validateField = (id, value) => {
    const fieldConfig = this.props.formJSON[0].fields.find(
      (field) => field.id === id
    );
    let error = "";
    if (fieldConfig.required && !value) {
      error = `${fieldConfig.label} is required`;
    }
    return { [id]: error };
  };

  // Form submit handler
  handleSubmit = (event) => {
    event.preventDefault();
    const { formData } = this.state;
    const errors = this.validateForm();
    if (Object.keys(errors).length === 0) {
      // Call onSubmit handler passed from parent
      this.props.onSubmit(
        Object.entries(formData).map(([key, value]) => ({ [key]: value }))
      );
    } else {
      this.setState({ errors });
    }
  };

  // Validate entire form
  validateForm = () => {
    const errors = {};
    this.props.formJSON[0].fields.forEach((field) => {
      const value = this.state.formData[field.id];
      if (field.required && !value) {
        errors[field.id] = `${field.label} is required`;
      }
    });
    return errors;
  };

  render() {
    const { formJSON } = this.props;
    const { formData, errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {formJSON[0].fields.map((field) => {
          if (field.id === "email" && !formData.subscribe) {
            return null;
          }
          return (
            <FormField
              key={field.id}
              field={field}
              value={formData[field.id] || ""}
              onChange={this.handleChange}
              error={errors[field.id]}
            />
          );
        })}
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default DynamicFormBuilder;
