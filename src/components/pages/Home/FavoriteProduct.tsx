import BackBtn from "@/components/atoms/Button/BackBtn";
import ProductCard1 from "@/components/atoms/card/ProductCard1";
import { useAppSelector } from "@/redux/hooks";

const FavoriteProduct = () => {
  const products = useAppSelector((state) => state.storeData.allProducts);
  const savedProduct = products.filter((product) => product.isFav === true);
  console.log("saved", savedProduct);

  return (
    <div className="custom-scroll no-scrollbar h-full pb-5">
      <div className="relative flex justify-center py-4">
        <div className="absolute top-0 bottom-0 left-2 my-auto -mb-[2.8px] h-fit">
          <BackBtn size={44} />
        </div>
        <h1 className="heading2 py-0">Favorite Product</h1>
      </div>
      {savedProduct.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 px-4 pt-2">
          {savedProduct.map((data) => (
            <ProductCard1 data={data} />
          ))}
        </div>
      ) : (
        <div className="flex h-[80%] items-center justify-center text-2xl font-semibold">
          <span>No Favorite Product Added Yet</span>
        </div>
      )}
    </div>
  );
};

export default FavoriteProduct;
