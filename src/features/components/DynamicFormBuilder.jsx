import { useState } from 'react';
import FormField from '../../components/FormField';

const DynamicFormBuilder = ({ formJSON, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  // Handle change for form inputs
  const handleChange = (id, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }));

    const updatedErrors = validateField(id, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...updatedErrors
    }));
  };

  // Validation function
  const validateField = (id, value) => {
    const fieldConfig = formJSON[0].fields.find((field) => field.id === id);
    let error = '';
    if (fieldConfig.required && !value) {
      error = `${fieldConfig.label} is required`;
    }
    return { [id]: error };
  };

  // Form submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      // Call onSubmit handler passed from parent
      onSubmit(Object.entries(formData).map(([key, value]) => ({ [key]: value })));
      // Clear form data after successful submission
      setFormData({});
      setErrors({});
    } else {
      setErrors(errors);
    }
  };

  // Validate entire form
  const validateForm = () => {
    const errors = {};
    formJSON[0].fields.forEach((field) => {
      const value = formData[field.id];
      if (field.required && !value) {
        errors[field.id] = `${field.label} is required`;
      }
    });
    return errors;
  };

  return (
    <form onSubmit={handleSubmit}>
      {formJSON[0].fields.map((field) => {
        if (field.id === 'email' && !formData.subscribe) {
          return null;
        }
        return (
          <FormField
            key={field.id}
            field={field}
            value={formData[field.id] || ''}
            onChange={handleChange}
            error={errors[field.id]}
          />
        );
      })}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicFormBuilder;
