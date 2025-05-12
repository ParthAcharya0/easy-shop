import { Link } from "react-router";

const HeaderLink = ({
  heading,
  subHeading = "View all",
  to = "",
}: {
  heading: string;
  subHeading: string;
  to: string;
}) => {
  return (
    <div className="flex w-full justify-between items-center">
      <h3 className="heading2 capitalize">{heading}</h3>
      <Link to={to}>
        <span className="text-base text-pink-600">{subHeading}</span>
      </Link>
    </div>
  );
};

export default HeaderLink;
