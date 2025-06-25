type InputProps = {
  label: string;
  type?: "text" | "email" | "password" | "number";
  placeholder: string;
  value?: string | number | undefined;
  variantStyle?: "outline" | "background";
  payloadKey?: string;
  handleChange?: any;
  error: string | undefined;
  setError?: React.Dispatch<any>;
};

const InputLable = ({
  label,
  type = "text",
  placeholder,
  value,
  variantStyle = "background",
  payloadKey = undefined,
  handleChange,
  error,
  setError,
}: InputProps) => {
  const outline = "bg-white border border-gray-300";
  const background = "bg-gray-100";
  const variant = variantStyle === "outline" ? outline : background;
  return (
    <label className="flex flex-col gap-2" htmlFor={label.toLowerCase()}>
      <span className="heading2 capitalize">{label}</span>
      {value === undefined ? (
        <input
          id={label.toLowerCase()}
          className={`rounded-full ${variant} px-5.5 py-3 placeholder:text-gray-400 focus-within:outline-0`}
          type={type}
          placeholder={placeholder}
          required={true}
        />
      ) : (
        <input
          id={label.toLowerCase()}
          className={`${value && error ? (error ? "invalid" : "valid") : ""} rounded-full ${variant} px-5.5 py-3 placeholder:text-gray-400 focus-within:outline-0`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            if (setError) {
              setError((prev: any) => ({ ...prev, [payloadKey ?? ""]: "" }));
              handleChange(e.target.value);
              return;
            }
            handleChange({
              type: "setField",
              payload: { key: payloadKey, value: e.target.value },
            });
            handleChange({ type: "reset", payload: payloadKey });
          }}
        />
      )}
      {value && error && <p className="text-red-600">*{error}</p>}
    </label>
  );
};

export default InputLable;
