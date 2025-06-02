import BackBtn from "@/components/atoms/Button/BackBtn";
import { Product } from "@/components/atoms/card/ProductCard";
import ProductCard1 from "@/components/atoms/card/ProductCard1";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "react-router";

const CategoryProduct = () => {
  let { categoryID } = useParams();
  const allProducts = useAppSelector((state) => state.storeData.allProducts);
  const categoryData = allProducts.filter(
    (product) => product.category_id.toString() === categoryID,
  );
  console.log("category", categoryData);
  console.log("all product", allProducts);
  return (
    <div className="custom-scroll no-scrollbar h-full pb-5">
      <div className="relative flex justify-center py-4">
        <div className="absolute top-0 bottom-0 left-2 my-auto -mb-[2.8px] h-fit">
          <BackBtn size={40} />
        </div>
        <h1 className="heading2 py-0">Popular Product</h1>
      </div>
      <div className="h-full w-full">
        {allProducts.length === 0 ? (
          <p className="flex h-44 items-center justify-center text-center font-medium">
            <span className="loader w-2xl"></span>
          </p>
        ) : categoryData.length !== 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 px-4 pt-2">
            {categoryData.map((product: Product, id: number) => (
              <ProductCard1 data={product} key={id} />
            ))}
          </div>
        ) : (
          <div className="text-1xl flex h-[80%] items-center justify-center font-medium">
            No Product in This Category
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProduct;
