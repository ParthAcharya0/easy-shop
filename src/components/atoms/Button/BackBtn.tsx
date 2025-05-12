import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router";

const BackBtn = ({ size }: { size: number }) => {
  const navigate = useNavigate();

  return (
    <button className="cursor-pointer"
      onClick={() => {
        navigate(-1);
      }}
    >
      <IoIosArrowRoundBack size={size} />
    </button>
  );
};

export default BackBtn;
