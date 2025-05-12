import { FaTshirt } from "react-icons/fa";

const CategoryCard = ({
  className = "bg-purple-500 text-purple-900",
}: {
  className?: string;
}) => {
  const baseStyle = "flex items-center justify-between gap-3 rounded-lg p-2.5";
  const newStyle = baseStyle + " " + className;

  return (
    <div className={newStyle}>
      <h4 className="text-xl font-medium">Fashion</h4>
      <FaTshirt size={50} />
    </div>
  );
};

export default CategoryCard;
