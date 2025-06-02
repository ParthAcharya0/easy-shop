import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router";


const BackBtn = ({ size, to = -1 }: { size: number; to?: string | -1 }) => {
  const navigate = useNavigate();

  return (
    <button
      className="cursor-pointer"
      onClick={() => {
       if (typeof to === "number") {
          navigate(to); // go back
        } else {
          navigate(to); // go to path
        }
      }}
    >
      <IoIosArrowRoundBack size={size} />
    </button>
  );
};

export default BackBtn;
