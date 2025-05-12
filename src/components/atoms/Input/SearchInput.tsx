import { useState } from "react";
import { CiFilter, CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router";

const SearchInput = () => {
  const [input, setInput] = useState("");
  return (
    <div className="flex items-center gap-2">
      <div className="relative grow">
        <div className="absolute top-0 bottom-0 left-2 my-auto h-fit">
          <CiSearch size={20} />
        </div>
        <input
          className="w-full rounded-lg bg-gray-200 px-8 py-2.5 focus-within:outline-0"
          type="text"
          value={input}
          placeholder="Serach Product here"
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <button
          className={`${input ? "block" : "hidden"} absolute top-0 right-1.5 bottom-0 my-auto h-fit cursor-pointer`}
          onClick={() => {
            return input && setInput("");
          }}
        >
          <IoClose size={24} />
        </button>
      </div>
      <Link to="/filter">
        <button className="cursor-pointer rounded-xl bg-gray-200 p-2.5">
          <CiFilter size={24} />
        </button>
      </Link>
    </div>
  );
};

export default SearchInput;
