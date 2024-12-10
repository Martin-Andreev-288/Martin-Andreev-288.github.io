import ErrorMessage from './ErrorMessage';

const FormField = ({ field, value, onChange, error }) => {
  const { id, label, type, placeholder, required, options } = field;

  return (
    <div className="form-group">
      <label>
        {label} {required && label !== 'Email' && '*'}
      </label>
      {type === 'text' && (
        <input
          type="text"
          id={id}
          placeholder={placeholder || ''}
          value={value || ''}
          onChange={(e) => onChange(id, e.target.value)}
        />
      )}
      {type === 'select' && (
        <select id={id} value={value || ''} onChange={(e) => onChange(id, e.target.value)}>
          <option value="">Select an option</option>
          {options &&
            options.map((option, index) => (
              <option key={index} value={option.label}>
                {option.label}
              </option>
            ))}
        </select>
      )}
      {type === 'checkbox' && (
        <input
          type="checkbox"
          id={id}
          checked={value || false}
          onChange={(e) => onChange(id, e.target.checked)}
        />
      )}
      <ErrorMessage error={error} />
    </div>
  );
};

export default FormField;
