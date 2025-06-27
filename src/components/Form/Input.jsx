// src/components/Form/Input.js

const Input = ({
  id,
  label = "",
  type = "text",
  placeholder = "",
  value = "",
  padding = "",
  spanComponent = null,
  onChange = () => {},
  readOnly = false,
  required = false,
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold">
          {label}
          {required && <span className="text-danger-200">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={type}
          className={`w-full border border-neutral-400 text-sm rounded-lg p-4 placeholder:text-secondary focus:outline-none focus:ring-0 active:outline-none active:ring-0 ${padding} ${
            readOnly
              ? "bg-neutral-200 text-secondary"
              : "bg-white focus:border-primary-300 "
          }`}
          placeholder={placeholder}
          defaultValue={value}
          onChange={onChange}
          readOnly={readOnly}
          required={required}
        />
        {spanComponent && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm">
            {spanComponent}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
