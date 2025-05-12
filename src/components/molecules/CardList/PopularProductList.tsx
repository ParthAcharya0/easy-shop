import ProductCard from "@/components/atoms/card/ProductCard";

const PopularProductList = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-3 pt-2">
      <ProductCard />
      <ProductCard />
    </div>
  );
};

export default PopularProductList;
