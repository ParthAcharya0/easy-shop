import { useEffect, useRef, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const DropDown = ({ options }: { options: { name: string; func: any }[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      className="relative px-3"
      ref={dropdownRef}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
      }}
    >
      <HiOutlineDotsHorizontal />
      {isOpen && (
        <div className="absolute top-[100%] right-0 z-50 flex flex-col rounded-lg bg-pink-600 text-sm text-white">
          {options?.map((option) => <Options optionDetails={option} />)}
        </div>
      )}
    </div>
  );
};

export default DropDown;

const Options = ({
  optionDetails,
}: {
  optionDetails: { name: string; func: any };
}) => {
  return (
    <div
      onClick={optionDetails.func}
      className="w-full rounded-lg px-3 py-2.5 font-medium capitalize hover:bg-pink-500"
    >
      {optionDetails.name}
    </div>
  );
};
