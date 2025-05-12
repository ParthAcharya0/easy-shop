import ProductCard1 from "@/components/atoms/card/ProductCard1";

const NProductList = () => {
  return (
    <div className="custom-scroll no-scrollbar flex flex-nowrap gap-3 pt-2">
      <ProductCard1 />
      <ProductCard1 />
      <ProductCard1 />
      <ProductCard1 />
    </div>
  );
};

export default NProductList;
