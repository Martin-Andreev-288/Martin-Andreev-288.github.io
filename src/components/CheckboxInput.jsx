const CheckboxInput = ({ id, checked, onChange }) => (
  <input
    type="checkbox"
    id={id}
    checked={checked || false}
    onChange={(e) => onChange(id, e.target.checked)}
  />
);

export default CheckboxInput;
