import { Component } from "react";

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

  // Render individual field based on type
  renderField = (field) => {
    const { id, label, type, placeholder, required, options } = field;
    const { formData, errors } = this.state;

    switch (type) {
      case "text":
        return (
          <div key={id} className="form-group">
            <label>
              {label} {required && "*"}
            </label>
            <input
              type="text"
              id={id}
              placeholder={placeholder || ""}
              value={formData[id] || ""}
              onChange={(e) => this.handleChange(id, e.target.value)}
            />
            {errors[id] && <div className="error">{errors[id]}</div>}
          </div>
        );
      case "select":
        return (
          <div key={id} className="form-group">
            <label>
              {label} {required && "*"}
            </label>
            <select
              id={id}
              value={formData[id] || ""}
              onChange={(e) => this.handleChange(id, e.target.value)}
            >
              <option value="">Select an option</option>
              {options.map((option, index) => (
                <option key={index} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors[id] && <div className="error">{errors[id]}</div>}
          </div>
        );
      case "checkbox":
        return (
          <div key={id} className="form-group">
            <label>
              <input
                type="checkbox"
                id={id}
                checked={formData[id] || false}
                onChange={(e) => this.handleChange(id, e.target.checked)}
              />
              {label}
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  render() {
    const { formJSON } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        {formJSON[0].fields.map((field) => {
          // Conditional rendering for "Subscribe" checkbox
          if (field.id === "email" && !this.state.formData.subscribe) {
            return null;
          }
          return this.renderField(field);
        })}
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default DynamicFormBuilder;
