interface TextProps {
  variant: string;
  className: string;
  childern: string;
}

const Text = ({ variant = "", className, childern }: TextProps) => {
  let style = "";

  switch (variant) {
    case (variant = "head1"):
      style = "text-3xl font-semibold text-black";
      break;

    case (variant = "head2"):
      style = "text-lg font-medium text-black";
      break;

    case (variant = "head3"):
      style = "text-base font-medium text-black";
      break;

    default:
      style = "text-3xl font-semibold text-black";
      break;
  }

  return <h2 className={`${style} ${className}`}>{childern}</h2>;
};

export default Text;
