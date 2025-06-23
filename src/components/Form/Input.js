// src/components/Form/Input.js

const Input = ({
  id,
  label,
  type = "text",
  placeholder = "",
  value = "",
  onChange,
  required = false,
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {required && <span className="text-danger-200">*</span>}
      </label>
      <input
        id={id}
        type={type}
        className="w-full bg-white border border-neutral-400 text-sm rounded-lg p-4 placeholder:text-secondary focus:border-primary-300 focus:outline-none focus:ring-0 active:outline-none active:ring-0"
        placeholder={placeholder}
        defaultValue={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;
