import { RiDeleteBin5Line } from "react-icons/ri";

const DustbinBtn = () => {
  return (
    <button className="cursor-pointer rounded-full bg-[rgba(255,255,255,0.30)] px-2 py-2 bg-blend-screen backdrop-blur-sm">
      <RiDeleteBin5Line color="white"/>
    </button>
  );
};

export default DustbinBtn;
