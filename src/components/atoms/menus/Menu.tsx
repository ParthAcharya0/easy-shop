import { AiOutlineShopping } from "react-icons/ai";
import { Link } from "react-router";

const Menu = ({
  children = <AiOutlineShopping size={24} />,
  label = "home",
  to = "/notavailable",
  active = false,
}: {
  children?: React.ReactNode;
  label?: string;
  to?: string;
  active?: boolean;
}) => {
  return (
    <Link to={to}>
      <div
        className={`flex flex-col items-center justify-center gap-1.5 p-1.5 ${!active && "text-gray-600"} `}
      >
        <div className="relative z-0">
          <div
            className={`${!active && "hidden"} absolute top-[-1px] right-0 z-[-1] aspect-square w-4 rounded-full bg-pink-600`}
          ></div>
          {children}
        </div>
        <span className="text-xs font-medium capitalize">{label}</span>
      </div>
    </Link>
  );
};

export default Menu;
