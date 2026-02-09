
const CategoryCard = ({
  className = "bg-purple-500 text-purple-900",
  data,
}: {
  className?: string;
  data: { cacategory_id: string; category_name: string };
}) => {
  const baseStyle =
    "flex items-center justify-between gap-3 rounded-lg p-2.5";
  const newStyle = baseStyle + " " + className;

  return (
    <div className={newStyle}>
      <h4 className="line-clamp-1 text-base font-medium">
        {data.category_name}
      </h4>
      {/* <div className="shrink-0">
        <FaTshirt size={44} />
      </div> */}
    </div>
  );
};

export default CategoryCard;
