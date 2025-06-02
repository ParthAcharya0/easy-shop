const InputWCountry = ({
  label,
  value,
  onChange,
  actionType,
  error,
}: {
  label: string;
  value: string;
  onChange: any;
  actionType?: string;
  error?: string | undefined;
}) => {
  const [number, setNumber] = [value, onChange];

  return (
    <label className="heading2" htmlFor="phoneNumber">
      {label}
      <div className="mt-2.5 flex rounded-full border border-gray-300 font-medium">
        <select
          className="cursor-pointer px-3"
          name="country-code"
          id="country-code"
        >
          <option value="+91">+ 91</option>
          <option value="+80">+ 91</option>
          <option value="+61">+ 91</option>
        </select>
        <input
          className={`${value ? (error ? "invalid" : "valid") : ""} w-full grow rounded-full px-4 py-3 focus-within:outline-0`}
          type="number"
          id="phoneNumber"
          value={number}
          inputMode="numeric"
          onChange={(e) =>
            e.target.value.length <= 10 &&
            setNumber(
              actionType === undefined
                ? e.target.value
                : { type: actionType, payload: e.target.value },
            )
          }
        />
      </div>
      {value && error && <p className="text-red-600">*{error}</p>}
    </label>
  );
};

export default InputWCountry;
