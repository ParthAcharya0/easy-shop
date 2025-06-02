import { FaTshirt } from "react-icons/fa";

const CategoryCard = ({
  className = "bg-purple-500 text-purple-900",
  data,
}: {
  className?: string;
  data: { cacategory_id: string; category_name: string };
}) => {
  const baseStyle = "flex items-center justify-between gap-3 rounded-lg p-2.5";
  const newStyle = baseStyle + " " + className;

  return (
    <div className={newStyle}>
      <h4 className="text-base font-medium line-clamp-2">{data.category_name}</h4>
      <div className="shrink-0">
        <FaTshirt size={50} />
      </div>
    </div>
  );
};

export default CategoryCard;
