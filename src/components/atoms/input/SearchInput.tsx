import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import NormalCard from "../card/NormalCard";
import { searchProducts } from "@/api/store";

type SearchInputProps = {
  setData?: React.Dispatch<React.SetStateAction<any[] | null>>;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
};

const DEBOUNCE_DELAY = 500;

const SearchInput = ({ setData, setLoading }: SearchInputProps) => {
  const [input, setInput] = useState("");
  const [searchData, setSearchData] = useState<any[] | null>([]);
  const [isSearching, setIsSearching] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (!input) {
      setData?.(null);
      setSearchData([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setLoading?.(true);
    setData ? setData([]) : setSearchData([]);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      const currentRequestId = ++requestIdRef.current;
      console.log(currentRequestId, requestIdRef.current)
      try {
        const res = await searchProducts({ query: input });
        if (currentRequestId !== requestIdRef.current) return;

        const products = res?.data?.products ?? null;

        if (setData) {
          setData(products);
        } else {
          setSearchData(products);
        }
      } catch {
        if (!setData) setSearchData(null);
      } finally {
        setIsSearching(false);
        setLoading?.(false);
      }
    }, DEBOUNCE_DELAY);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [input, setData, setLoading]);

  return (
    <div className="relative">
      <div className="z-50 flex items-center gap-2">
        <div className="relative grow">
          <div className="absolute left-3.5 top-0 bottom-0 my-auto h-fit">
            <CiSearch size={20} color="grey" />
          </div>

          <input
            className="w-full rounded-lg bg-gray-100 px-10 py-3.5 placeholder:text-base focus:outline-0"
            type="text"
            value={input}
            placeholder="Search Product here"
            onChange={(e) => setInput(e.currentTarget.value)}
          />

          {input && (
            <button
              className="absolute right-1.5 top-0 bottom-0 my-auto h-fit"
              onClick={() => setInput("")}
            >
              <IoClose size={24} />
            </button>
          )}
        </div>

        {/* <Link to="/filter">
          <button className="rounded-xl bg-gray-100 p-3.5">
            <CiFilter size={24} />
          </button>
        </Link> */}
      </div>

      {!setData && (
        <div
          className={`absolute top-14 z-10 w-full bg-white transition-all duration-300 ${
            input ? "h-[calc(100dvh-240px)]" : "h-0"
          } overflow-hidden`}
        >
          <div className="h-full overflow-y-auto">
            {searchData === null ? (
              <p className="flex h-full items-center justify-center font-medium">
                No products are found
              </p>
            ) : isSearching ? (
              <p className="flex h-full items-center justify-center">
                <span className="loader w-2xl"></span>
              </p>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-4 px-4 pt-2">
                {searchData.map((product, id) => (
                  <NormalCard key={id} data={product} from="search" />
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
