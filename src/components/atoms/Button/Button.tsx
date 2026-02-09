import { Link } from "react-router";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
  children: React.ReactNode;
  state?: boolean;
  type?: "button" | "submit";
  eventHandler?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  to = null,
  children,
  type = "button",
  className,
  state = false,
  eventHandler,
  ...rest
}) => {
  return (
    <Link to={to ?? ""}>
      <button
        className={
          "w-full cursor-pointer rounded-full bg-pink-500 px-5 py-4 text-sm font-medium text-white hover:bg-pink-700 " +
          className
        }
        disabled={state}
        onClick={eventHandler}
        type={type}
        {...rest}
      >
        {children}
      </button>
    </Link>
  );
};

export default Button;
