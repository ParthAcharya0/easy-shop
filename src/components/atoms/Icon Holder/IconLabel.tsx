import { JSX } from "react";

const IconLabel = ({
  label,
  childern,
}: {
  label: string;
  childern: JSX.Element;
}) => {
  return (
    <div className="flex flex-col gap-1">
      {childern}
      <span className="text-xs">{label}</span>
    </div>
  );
};

export default IconLabel;
