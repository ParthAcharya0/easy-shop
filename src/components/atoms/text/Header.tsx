const Header = ({
  heading,
  subHeading,
}: {
  heading: string;
  subHeading: string;
}) => {
  return (
    <div>
      <h2 className="heading1 pb-1 capitalize">{heading}</h2>
      <p className="sub-heading">{subHeading}</p>
    </div>
  );
};

export default Header;
