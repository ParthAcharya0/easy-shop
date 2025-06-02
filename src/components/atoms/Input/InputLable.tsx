type InputProps = {
  label: string;
  type?: "text" | "email" | "password";
  placeholder: string;
  value?: string | number;
  actionType?: string;
  handleChange?: any;
  error: string;
};

const InputLable = ({
  label,
  type = "text",
  placeholder,
  value,
  actionType,
  handleChange,
  error,
}: InputProps) => {
  return (
    <label className="flex flex-col gap-2" htmlFor={label.toLowerCase()}>
      <span className="heading2 capitalize">{label}</span>
      {value === undefined ? (
        <input
          id={label.toLowerCase()}
          className="rounded-full bg-gray-100 px-5.5 py-3 placeholder:text-gray-400 focus-within:outline-0"
          type={type}
          placeholder={placeholder}
          required={true}
        />
      ) : (
        <input
          id={label.toLowerCase()}
          className={`${value ? (error ? "invalid" : "valid") : ""} rounded-full bg-gray-100 px-5.5 py-3 placeholder:text-gray-400 focus-within:outline-0`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) =>
            handleChange({ type: actionType, payload: e.currentTarget.value })
          }
        />
      )}
      {value && error && <p className="text-red-600">*{error}</p>}
    </label>
  );
};

export default InputLable;
