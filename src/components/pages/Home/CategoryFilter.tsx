import { IMAGES } from "@/app/images/images";
import BackBtn from "@/components/atoms/Button/BackBtn";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GiPirateCoat } from "react-icons/gi";

interface FilterOption {
  id: string;
  label: string;
  options: string[];
}

const filterOptions: FilterOption[] = [
  {
    id: "category",
    label: "Category",
    options: [
      "Supermarkets",
      "Restaurants",
      "Pharmacy",
      "Spirits",
      "Technology",
      "Beauty",
      "Fashion",
      "Home",
      "Gifts",
      "Books",
    ],
  },
  { id: "gender", label: "Gender", options: ["Men", "Women", "Unisex"] },
  {
    id: "fabrics",
    label: "Fabrics",
    options: ["Cotton", "Polyester", "Wool", "Silk", "Linen"],
  },
  {
    id: "color",
    label: "Color",
    options: ["Black", "White", "Red", "Blue", "Green"],
  },
  {
    id: "price",
    label: "Price",
    options: ["Under $50", "$50-$100", "$100-$200", "Over $200"],
  },
  {
    id: "discount",
    label: "Discount",
    options: ["10% Off", "20% Off", "30% Off", "50% Off"],
  },
  {
    id: "rating",
    label: "Rating",
    options: ["4★ & above", "3★ & above", "2★ & above"],
  },
  { id: "size", label: "Size", options: ["XS", "S", "M", "L", "XL", "XXL"] },
  {
    id: "combo",
    label: "Combo",
    options: ["Buy 1 Get 1", "Buy 2 Get 1", "Special Bundle"],
  },
  {
    id: "material",
    label: "Material",
    options: ["Leather", "Metal", "Plastic", "Glass"],
  },
  {
    id: "bottomLength",
    label: "Bottom Length",
    options: ["Short", "Regular", "Long"],
  },
];

const CategoryFilter = () => {
  const [activeTab, setActiveTab] = useState("category");

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
            {filterOptions.map((category, index) => {
              return (
                <li
                  className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 py-4 text-center text-sm text-gray-400 hover:bg-pink-500 hover:text-white"
                  onClick={() => setActiveTab(category.id)}
                  key={index}
                >
                  <GiPirateCoat size={24} />
                  {category.label}
                </li>
              );
            })}
          </ul>
        </div>

        <div
          id="filter-options"
          className="custom-scroll no-scrollbar flex-1 py-2 pl-4"
        >
          {filterOptions.map((options) => {
            return (
              <div
                key={options.id}
                className={`w-full ${activeTab === options.id ? "block" : "hidden"}`}
              >
                <h3 className="pb-2 text-sm font-medium">{options.label}</h3>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-4 px-4">
                  {options.options.map((option) => {
                    return (
                      <div className="flex h-fit flex-col items-center justify-center gap-1.5 text-center">
                        <img
                          className="h-20 w-20 rounded-full object-cover"
                          src={IMAGES.LoginBanner}
                          alt=""
                        />
                        <h5 className="text-xs font-light">{option}</h5>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
