import BackBtn from "@/components/atoms/Button/BackBtn";
import ProductCard1 from "@/components/atoms/card/ProductCard1";

const FavoriteProduct = () => {
  return (
    <div className="custom-scroll no-scrollbar h-full pb-5">
      <div className="relative flex justify-center py-4">
        <div className="absolute top-0 bottom-0 left-2 my-auto -mb-[2.8px] h-fit">
          <BackBtn size={44} />
        </div>
        <h1 className="heading2 py-0">Favorite Product</h1>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 px-4 pt-2">
        <ProductCard1 variant={true} />
        <ProductCard1 variant={true} />
        <ProductCard1 variant={true} />
      </div>
    </div>
  );
};

export default FavoriteProduct;
