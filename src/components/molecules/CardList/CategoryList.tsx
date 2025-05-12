import CategoryCard from "@/components/atoms/card/CategoryCard";

const CategoryList = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 pt-2">
      <CategoryCard />
      <CategoryCard className="bg-green-200 text-green-600" />
      <CategoryCard className="bg-orange-200 text-amber-600" />
      <CategoryCard className="bg-yellow-100 text-yellow-500" />
      <CategoryCard className="bg-blue-200 text-blue-600" />
      <CategoryCard className="bg-pink-200 text-pink-600" />
    </div>
  );
};

export default CategoryList;
