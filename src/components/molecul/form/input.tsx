import {
  faEye,
  faEyeSlash,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  icon?: IconDefinition;
}

export default function InputField({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  error,
  icon,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="mt-1 w-full sm:w-[300px]">
      <label className="text-xs font-bold text-gray-100/80" htmlFor={name}>
        {label}
      </label>
      <div className="flex items-center mt-1 bg-gray-900/80 rounded-lg px-3 py-2">
        {icon && <FontAwesomeIcon icon={icon} width={18} opacity={0.5} />}
        <input
          type={showPassword && type === "password" ? "text" : type}
          id={name}
          name={name}
          className="w-full bg-transparent text-white text-xs font-medium py-2 px-2 outline-none border-none"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="ml-2 cursor-pointer"
            onClick={togglePasswordVisibility}
            opacity={0.5}
          />
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
