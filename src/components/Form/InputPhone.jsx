// src/components/Form/InputPhone.js

import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const InputPhone = ({ id, label, required = false }) => {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {required && <span className="text-danger-200">*</span>}
      </label>
      <PhoneInput
        id={id}
        international
        defaultCountry="US"
        value={value}
        onChange={setValue}
        className="phone-input-custom w-full bg-white border border-neutral-400 text-sm rounded-lg p-4 placeholder:text-secondary focus:border-primary-300 focus:outline-none focus:ring-0 active:outline-none active:ring-0"
        disableCountrySelect
      />
    </div>
  );
};

export default InputPhone;
