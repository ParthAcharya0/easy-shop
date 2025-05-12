import BackBtn from "@/components/atoms/Button/BackBtn";
import CategoryCard from "@/components/atoms/card/CategoryCard";
import ProductCard1 from "@/components/atoms/card/ProductCard1";
import SearchInput from "@/components/atoms/Input/SearchInput";

const AllPopularProduct = () => {
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
        <CategoryCard />
        <CategoryCard className="bg-green-200 text-green-600" />
        <CategoryCard className="bg-orange-200 text-amber-600" />
        <CategoryCard className="bg-yellow-100 text-yellow-500" />
        <CategoryCard className="bg-blue-200 text-blue-600" />
        <CategoryCard className="bg-pink-200 text-pink-600" />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 px-4 pt-2">
        <ProductCard1 />
        <ProductCard1 />
        <ProductCard1 />
        <ProductCard1 />
        <ProductCard1 />
        <ProductCard1 />
        <ProductCard1 />
        <ProductCard1 />
        <ProductCard1 />
        <ProductCard1 />
        <ProductCard1 />
        <ProductCard1 />
      </div>
    </div>
  );
};

export default AllPopularProduct;
