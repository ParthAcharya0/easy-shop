import { Link } from "react-router";

const Button = ({
  to,
  children,
  state = false,
}: {
  to: string;
  children: React.ReactNode;
  state?: boolean;
}) => {
  return (
    <Link to={to}>
      <button
        className="w-full cursor-pointer rounded-full bg-pink-500 px-5 py-4 text-sm font-medium text-white hover:bg-pink-700"
        disabled={state}
      >
        {children}
      </button>
    </Link>
  );
};

export default Button;
