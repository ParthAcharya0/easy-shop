import ProductCard from "@/components/atoms/card/ProductCard";
import { Products } from "@/utils/getProducts";

const PopularProductList = ({
  data,
  variant = "normal",
}: {
  data: Products;
  variant?: "normal" | "limited";
}) => {
  const products = variant === "normal" ? data : [data[5], data[3]];

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-3 pt-2">
      {products.length === 0 ? (
        <p>No Data Found</p>
      ) : (
        products.map((product, id) => <ProductCard key={id} details={product} />)
      )}
    </div>
  );
};

export default PopularProductList;
