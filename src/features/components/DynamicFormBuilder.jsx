import { useState, useEffect } from 'react';
import FormField from '../../components/FormField';

const DynamicFormBuilder = ({ formJSON, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [visibleFields, setVisibleFields] = useState(formJSON[0].fields);

  // Update visible fields when formData.subscribe changes
  useEffect(() => {
    const updatedFields = formJSON[0].fields.filter((field) => {
      if (field.id === 'email' && !formData.subscribe) {
        return false; // Exclude email if not subscribed
      }
      return true; // Include all other fields
    });
    setVisibleFields(updatedFields);
  }, [formData.subscribe, formJSON]);

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
    visibleFields.forEach((field) => {
      const value = formData[field.id];
      if (field.required && !value) {
        errors[field.id] = `${field.label} is required`;
      }
    });
    return errors;
  };

  return (
    <form onSubmit={handleSubmit}>
      {visibleFields.map((field) => (
        <FormField
          key={field.id}
          field={field}
          value={formData[field.id] || ''}
          onChange={handleChange}
          error={errors[field.id]}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicFormBuilder;
