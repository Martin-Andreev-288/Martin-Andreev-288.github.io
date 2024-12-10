const TextInput = ({ id, placeholder, value, onChange }) => (
  <input
    type="text"
    id={id}
    placeholder={placeholder || ''}
    value={value || ''}
    onChange={(e) => onChange(id, e.target.value)}
  />
);

export default TextInput;
