type SelectProps = {
  label: string;
  value?: string | number | null;
  optionList: {
    id: number;
    name: string;
  }[];
  defaultOption: string;
  handleChange?: any;
  error?: string;
};

const Select = ({
  label,
  value,
  optionList,
  defaultOption,
  handleChange,
  error,
}: SelectProps) => {
  return (
    <label className="flex flex-col gap-2" htmlFor={label.toLowerCase()}>
      <span className="heading2 capitalize">{label}</span>
      <select
        onChange={(e) => handleChange(e.target.value)}
        value={value ?? ""}
        className="w-full rounded-full border border-gray-300 bg-white px-5.5 py-3 placeholder:text-gray-400 focus-within:outline-0"
      >
        <option value={""}>{defaultOption}</option>
        {optionList?.map((option) => (
          <option key={`${option.id}_${option.name}`} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      {value && error && <p className="text-red-600">*{error}</p>}
    </label>
  );
};

export default Select;
