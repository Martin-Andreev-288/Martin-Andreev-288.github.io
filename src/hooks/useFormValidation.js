const useFormValidation = () => {
  const validateField = (fieldConfig, value) => {
    let error = '';
    if (fieldConfig.required && !value) {
      error = `${fieldConfig.label} is required`;
    }
    return error;
  };

  const validateForm = (fields, formData) => {
    const errors = {};
    fields.forEach((field) => {
      const value = formData[field.id];
      if (field.required && !value) {
        errors[field.id] = `${field.label} is required`;
      }
    });
    return errors;
  };

  return { validateField, validateForm };
};

export default useFormValidation;
