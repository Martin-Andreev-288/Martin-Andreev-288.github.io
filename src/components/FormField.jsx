import ErrorMessage from './ErrorMessage';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import CheckboxInput from './CheckboxInput';

const FormField = ({ field, value, onChange, error }) => {
  const { id, label, type, placeholder, required, options } = field;

  return (
    <div className="form-group">
      <label>
        {label} {required && label !== 'Email' && '*'}
      </label>
      {type === 'text' && (
        <TextInput id={id} placeholder={placeholder} value={value} onChange={onChange} />
      )}
      {type === 'select' && (
        <SelectInput id={id} value={value} onChange={onChange} options={options} />
      )}
      {type === 'checkbox' && <CheckboxInput id={id} checked={value} onChange={onChange} />}
      <ErrorMessage error={error} />
    </div>
  );
};

export default FormField;
