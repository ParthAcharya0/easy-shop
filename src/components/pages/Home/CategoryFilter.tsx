import { IMAGES } from "@/app/images/images";
import BackBtn from "@/components/atoms/button/BackButton";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GiPirateCoat } from "react-icons/gi";
import { Link } from "react-router";

const CategoryFilter = () => {
  const data = useAppSelector((state) => state.storeData.data);
  const [activeTab, setActiveTab] = useState(data[0].category_name ?? "");
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
        <BackBtn size={32} />
        <span className="heading3">Category</span>
        <div>
          <CiSearch size={32} />
        </div>
      </div>

      <div className="flex min-h-0 grow">
        <div className="custom-scroll no-scrollbar no-scrollbar h-full w-full max-w-[28%] rounded-bl-xl bg-gray-50">
          <ul className="flex h-full flex-col">
            {data.map((category, index) => {
              return (
                <li
                  className={`flex w-full cursor-pointer flex-col items-center justify-center gap-2 px-2 py-4 text-center text-sm text-gray-400 ${activeTab === category.category_name ? "bg-pink-500 text-white" : "hover:bg-pink-200 hover:text-white"}`}
                  onClick={() => setActiveTab(category.category_name)}
                  key={index}
                >
                  <GiPirateCoat size={24} />
                  {category.category_name}
                </li>
              );
            })}
          </ul>
        </div>

        <div
          id="filter-options"
          className="custom-scroll no-scrollbar flex-1 py-2 pl-4"
        >
          {data.map((options) => {
            return (
              <div
                key={options.category_name}
                className={`h-full w-full ${activeTab === options.category_name ? "block" : "hidden"}`}
              >
                <h3 className="pb-2 text-sm font-medium">
                  {options.category_name}
                </h3>
                {options.subcategories.length === 0 ||
                options.subcategories[0].subcategory_id === null ? (
                  <div className="flex h-[80%] items-center justify-center text-base font-medium capitalize">
                    no sub Category
                  </div>
                ) : (
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-4 px-4">
                    {options.subcategories.map((option) => {
                      return (
                        <Link to={"/"}>
                          <div className="flex h-fit flex-col items-center justify-center gap-1.5 text-center">
                            <img
                              className="h-20 w-20 rounded-full object-cover"
                              src={IMAGES.LoginBanner}
                              alt=""
                            />
                            <h5 className="text-xs font-light">
                              {option.subcategory_name}
                            </h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
