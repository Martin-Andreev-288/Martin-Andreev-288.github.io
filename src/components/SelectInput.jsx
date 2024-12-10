const SelectInput = ({ id, value, onChange, options }) => (
  <select id={id} value={value || ''} onChange={(e) => onChange(id, e.target.value)}>
    <option value="">Select an option</option>
    {options &&
      options.map((option, index) => (
        <option key={index} value={option.label}>
          {option.label}
        </option>
      ))}
  </select>
);

export default SelectInput;
