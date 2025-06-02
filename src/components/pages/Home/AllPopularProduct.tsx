import getStore from "@/api/getStore";
import BackBtn from "@/components/atoms/Button/BackBtn";
import CategoryCard from "@/components/atoms/card/CategoryCard";
import { Product } from "@/components/atoms/card/ProductCard";
import ProductCard1 from "@/components/atoms/card/ProductCard1";
import SearchInput from "@/components/atoms/Input/SearchInput";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

const colorTheme = [
  "bg-purple-500 text-purple-900",
  "bg-green-200 text-green-600",
  "bg-orange-200 text-amber-600",
  "bg-yellow-100 text-yellow-500",
  "bg-blue-200 text-blue-600",
  "bg-pink-200 text-pink-600",
];

const AllPopularProduct = () => {
  const store = useAppSelector((state) => state.storeData);
  const access = useAppSelector((state) => state.auth.accessToken);
  const storeData = store.data;
  const allProducts = store.allProducts;

  useEffect(() => {
    storeData.length === 0 && getStore(access);
  }, []);

  return (
    <div className="custom-scroll no-scrollbar h-full pb-5">
      <div className="relative flex justify-center py-4">
        <div className="absolute top-0 bottom-0 left-2 my-auto -mb-[2.8px] h-fit">
          <BackBtn size={40} />
        </div>
        <h1 className="heading2 py-0">Popular Product</h1>
      </div>
      <div className="px-4 py-2">
        <SearchInput />
      </div>
      <div className="custom-scroll no-scrollbar no-scrollbar thumb flex gap-2.5 px-4 py-2">
        {storeData.length === 0 ? (
          <p className="flex h-44 items-center justify-center text-center font-medium">
            <span className="loader w-2xl"></span>
          </p>
        ) : (
          storeData.map((category: any, index: number) => (
            <CategoryCard
              key={index}
              data={category}
              className={colorTheme[index % colorTheme.length]}
            />
          ))
        )}
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 px-4 pt-2">
        {storeData.length === 0 ? (
          <p className="flex h-44 items-center justify-center text-center font-medium">
            <span className="loader w-2xl"></span>
          </p>
        ) : allProducts.length >= 0 ? (
          allProducts.map((product: Product) => <ProductCard1 data={product} />)
        ) : (
          <p>No Data Found</p>
        )}
      </div>
    </div>
  );
};

export default AllPopularProduct;
