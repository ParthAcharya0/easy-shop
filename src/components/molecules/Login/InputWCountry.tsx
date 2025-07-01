const InputWCountry = ({
  label,
  selectValue,
  onSelect,
  value,
  onChange,
  actionType,
  payloadKey,
  error,
}: {
  label: string;
  selectValue: string;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  onChange: any;
  actionType?: string;
  payloadKey?: string;
  error?: string | undefined;
}) => {
  const [number, setNumber] = [value, onChange];

  return (
    <label className="heading2" htmlFor="phoneNumber">
      {label}
      <div
        className={`${value && error ? (error ? "invalid" : "valid") : ""} mt-2.5 flex rounded-full border border-gray-300 font-medium`}
      >
        <select
          className="cursor-pointer px-3"
          name="country-code"
          id="country-code"
          value={selectValue}
          onChange={(e) => onSelect(e.target.value)}
        >
          <option value="+91">+ 91</option>
          <option value="+81">+ 81</option>
          <option value="+61">+ 61</option>
        </select>
        <input
          className={`w-full grow rounded-full px-4 py-3 focus-within:outline-0`}
          type="number"
          id="phoneNumber"
          value={number}
          inputMode="numeric"
          onChange={(e) => {
            if (!(e.target.value.length <= 10)) return;

            if (actionType === undefined) {
              setNumber(e.target.value);
            } else {
              setNumber({
                type: actionType,
                payload: { key: payloadKey, value: e.target.value },
              });
              setNumber({ type: "reset", payload: payloadKey });
            }
          }}
        />
      </div>
      {value && error && (
        <p className="text-base text-nowrap text-red-600">*{error}</p>
      )}
    </label>
  );
};

export default InputWCountry;
