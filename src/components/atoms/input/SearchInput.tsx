import searchProducts from "@/api/searchProducts";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useRef, useState } from "react";
import { CiFilter, CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router";
import NormalCard from "../card/NormalCard";
import { Product } from "../card/ProductCard";

const SearchInput = ({
  setData = undefined,
  setLoading = undefined,
}: {
  setData?: undefined | React.Dispatch<React.SetStateAction<any[] | null>>;
  setLoading?: undefined | React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [input, setInput] = useState("");
  const [searchData, setSearchData] = useState<any[] | null>([]);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const ID = useRef<any>(null);

  useEffect(() => {
    ID.current && clearTimeout(ID.current);
    if (input) {
      setLoading && setLoading(true);
      setData ? setData([]) : setSearchData([]);

      ID.current = setTimeout(() => {
        searchProducts(accessToken, input).then((res) => {
          if (setData) {
            res?.data?.products ? setData(res?.data?.products) : setData([]);
            setLoading && setLoading(false);
          } else {
            res?.data?.products
              ? setSearchData(res.data.products)
              : setSearchData(null);
          }
        });
      }, 500);
    } else {
      setData && setData(null);
    }
  }, [input]);

  return (
    <div className="relative">
      <div className="z-50 flex items-center gap-2">
        <div className="relative grow">
          <div className="absolute top-0 bottom-0 left-3.5 my-auto h-fit">
            <CiSearch size={20} color="grey" />
          </div>
          <input
            className="w-full rounded-lg bg-gray-100 px-10 py-3.5 placeholder:text-base focus-within:outline-0"
            type="text"
            name="search"
            value={input}
            placeholder="Search Product here"
            onChange={(e) => setInput(e.currentTarget.value)}
          />
          <button
            className={`${input ? "block" : "hidden"} absolute top-0 right-1.5 bottom-0 my-auto h-fit cursor-pointer`}
            onClick={() => {
              return input && setInput("");
            }}
          >
            <IoClose size={24} />
          </button>
        </div>
        <Link to="/filter">
          <button className="h-full cursor-pointer rounded-xl bg-gray-100 p-3.5">
            <CiFilter size={24} />
          </button>
        </Link>
      </div>
      {/* {input && (
        <div className="absolute top-14 z-10 h-[75dvh] w-full bg-amber-500"></div>
      )} */}
      {!setData && (
        <div
          className={`${input ? "h-[calc(100dvh-240px)]" : "h-0"} ove5rflow-hidden absolute top-14 z-10 w-full bg-white transition-all duration-300 ease-in-out`}
        >
          <div className="h-full overflow-y-auto">
            {searchData === null ? (
              <p className="flex h-full items-center justify-center text-center font-medium">
                <span>No products are found</span>
              </p>
            ) : searchData.length === 0 ? (
              <p className="flex h-full items-center justify-center text-center font-medium">
                <span className="loader w-2xl"></span>
              </p>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-4 px-4 pt-2">
                {searchData.map((product: Product, id: number) => (
                  <NormalCard data={product} key={id} from="search" />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
