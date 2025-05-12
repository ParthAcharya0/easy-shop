import { useState } from "react";

const InputWCountry = ({ label }: { label: string }) => {
  const [number, setNumber] = useState("12354567890");

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
          <option value="+80">+ 80</option>
          <option value="+61">+ 61</option>
        </select>
        <input
          className="w-full grow px-4 py-3 focus-within:outline-0"
          type="number"
          id="phoneNumber"
          value={number}
          onChange={(e) =>
            e.target.value.length <= 10 && setNumber(e.target.value)
          }
        />
      </div>
    </label>
  );
};

export default InputWCountry;
