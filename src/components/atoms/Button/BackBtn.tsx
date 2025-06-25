import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router";

const BackBtn = ({ size, to = -1 }: { size: number; to?: string | -1 }) => {
  const navigate = useNavigate();

  return (
    <button
      className="cursor-pointer"
      onClick={() => {
        if (typeof to === "string") {
          navigate(to); // navigate to a path
        } else {
          navigate(to); // navigate with delta (-1)
        }
      }}
    >
      <IoIosArrowRoundBack size={size} />
    </button>
  );
};

export default BackBtn;
