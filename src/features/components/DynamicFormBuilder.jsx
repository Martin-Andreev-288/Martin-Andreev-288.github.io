import { useState, useEffect } from 'react';
import FormField from '../../components/FormField';
import useFormValidation from '../../hooks/useFormValidation';

const DynamicFormBuilder = ({ formJSON, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [visibleFields, setVisibleFields] = useState(formJSON[0].fields);
  const { validateField, validateForm } = useFormValidation();

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

    const updatedErrors = {
      [id]: validateField(
        formJSON[0].fields.find((f) => f.id === id),
        value
      )
    };
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...updatedErrors
    }));
  };

  // Form submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm(formJSON[0].fields, formData);
    if (Object.keys(errors).length === 0) {
      onSubmit(Object.entries(formData).map(([key, value]) => ({ [key]: value })));
      setFormData({});
      setErrors({});
    } else {
      setErrors(errors);
    }
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
