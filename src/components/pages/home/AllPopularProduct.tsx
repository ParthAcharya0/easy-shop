import getStore from "@/api/getStore";
import BackBtn from "@/components/atoms/button/BackButton";
import CategoryCard from "@/components/atoms/card/CategoryCard";
import { Product } from "@/components/atoms/card/ProductCard";
import NormalCard from "@/components/atoms/card/NormalCard";
import SearchInput from "@/components/atoms/input/SearchInput";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";

const colorTheme = [
  "bg-purple-300 text-purple-900 border-purple-900",
  "bg-green-200 text-green-600 border-green-600",
  "bg-orange-200 text-amber-600 border-amber-600",
  "bg-yellow-100 text-yellow-500 border-yellow-500",
  "bg-blue-200 text-blue-600 border-blue-600",
  "bg-pink-200 text-pink-600 border-pink-600",
];

const AllPopularProduct = () => {
  const store = useAppSelector((state) => state.storeData);
  const access = useAppSelector((state) => state.auth.accessToken);
  const [searchData, setSearchData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(0);
  const [page, setPage] = useState(0);
  const storeData = store.data;
  const categoryList = [
    {
      category_id: 0,
      category_name: "All Products",
    },
    ...storeData,
  ];
  const allProducts = store.allProducts;
  const showProducts = 6;
  const categoryData = allProducts.filter(
    (product) => product.category_id === category,
  );

  const products =
    category === 0
      ? allProducts.slice(
          page * showProducts,
          page * showProducts + showProducts,
        )
      : categoryData.slice(
          page * showProducts,
          page * showProducts + showProducts,
        );

  const totalPage =
    category === 0
      ? Math.ceil(allProducts.length / showProducts)
      : Math.ceil(categoryData.length / showProducts);

  useEffect(() => {
    storeData.length === 0 && getStore(access);
  }, []);
  return (
    <div className="custom-scroll no-scrollbar h-full">
      <div className="relative flex justify-center py-4">
        <div className="absolute top-0 bottom-0 left-2 my-auto -mb-[2.8px] h-fit">
          <BackBtn size={40} />
        </div>
        <h1 className="pt-3 text-xl font-semibold text-black">
          Popular Products
        </h1>
      </div>
      <div className="px-4 py-2">
        <SearchInput setData={setSearchData} setLoading={setLoading} />
      </div>
      {searchData === null ? (
        <>
          <div className="custom-scroll no-scrollbar no-scrollbar thumb flex gap-2.5 px-4 py-2">
            {storeData.length === 0 ? (
              <div className="flex h-44 w-full items-center justify-center text-center font-medium">
                <span className="loader w-2xl"></span>
              </div>
            ) : (
              categoryList.map((categorys: any, index: number) => (
                <button
                  className={`cursor-pointer text-nowrap`}
                  key={index}
                  onClick={() => {
                    setCategory(categorys.category_id);
                    setPage(0);
                  }}
                >
                  <CategoryCard
                    data={categorys}
                    className={`${colorTheme[index % colorTheme.length]} ${category === categorys.category_id ? "border-1" : "border-0"} min-w-[210px] border px-4`}
                  />
                </button>
              ))
            )}
          </div>
          <>
            {storeData.length === 0 ? (
              <p className="flex h-44 items-center justify-center text-center font-medium">
                <span className="loader w-2xl"></span>
              </p>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-4 px-4 pt-4">
                  {products.map((product: Product, id: number) => (
                    <NormalCard key={id} data={product} />
                  ))}
                </div>
                {totalPage !== 1 && (
                  <div className="flex justify-center gap-2 py-6 text-lg font-medium capitalize">
                    <button
                      className="cursor-pointer capitalize"
                      onClick={() => setPage((prev) => prev - 1)}
                      disabled={page <= 0}
                    >
                      Prev
                    </button>
                    <span>{page + 1}</span>
                    <button
                      className="cursor-pointer capitalize"
                      onClick={() => setPage((prev) => prev + 1)}
                      disabled={page + 1 >= totalPage}
                    >
                      next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="flex h-[55%] items-center justify-center text-xl font-medium">
                No Data Found
              </p>
            )}
          </>
        </>
      ) : loading ? (
        <div className="flex h-full items-center justify-center text-center font-medium">
          <span className="loader w-2xl"></span>
        </div>
      ) : searchData.length === 0 ? (
        <p className="flex h-[70dvh] w-full items-center justify-center text-center text-xl font-medium capitalize">
          no products available
        </p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-4 px-4 pt-2">
          {searchData.map((product: Product, id: number) => (
            <NormalCard data={product} key={id} from="search" />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPopularProduct;
