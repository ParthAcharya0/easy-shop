import { Link } from "react-router";

const Button = ({
  to = null,
  children,
  type = "button",
  state = false,
  eventHandler,
}: {
  to?: string | null;
  children: React.ReactNode;
  state?: boolean;
  type?: "button" | "submit";
  eventHandler?: () => void;
}) => {
  const className =
    "w-full cursor-pointer rounded-full bg-pink-500 px-5 py-4 text-sm font-medium text-white hover:bg-pink-700";

  const button = (
    <button
      className={className}
      disabled={state}
      onClick={eventHandler}
      type={type}
    >
      {children}
    </button>
  );

  return to === null ? button : <Link to={to}>{button}</Link>;
};

export default Button;
