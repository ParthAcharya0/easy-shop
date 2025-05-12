import BackBtn from "@/components/atoms/Button/BackBtn";
import { useState } from "react";

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

const Filter = () => {
  const [activeTab, setActiveTab] = useState("category");

  function handleRest() {
    const target = document.querySelector("#filter-options");
    const allChecked = target?.querySelectorAll(
      "input:checked",
    ) as NodeListOf<HTMLInputElement>;

    allChecked?.forEach((input): void => {
      input.checked = false;
    });
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
        <BackBtn size={32} />
        <span className="heading3">Filter</span>
        <button
          onClick={handleRest}
          className="text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          RESET
        </button>
      </div>

      <div className="custom-scroll no-scrollbar flex min-h-0 grow">
        <div className="custom-scroll no-scrollbar h-full w-full max-w-[25%] bg-gray-50">
          <ul className="flex h-full flex-col">
            {filterOptions.map((category, index) => {
              return (
                <li
                  className="w-full cursor-pointer py-4 text-center text-sm hover:bg-gray-400 hover:text-white"
                  onClick={() => setActiveTab(category.id)}
                  key={index}
                >
                  {category.label}
                </li>
              );
            })}
          </ul>
        </div>

        <div
          id="filter-options"
          className="flex-1 overflow-y-auto bg-white py-2 pl-4"
        >
          {filterOptions.map((options) => {
            return options.options.map((option) => {
              return (
                <div
                  key={option}
                  className={`w-full ${activeTab === options.id ? "block" : "hidden"}`}
                >
                  <label
                    className="flex items-center gap-2 border-b border-gray-200 py-4 text-sm"
                    htmlFor={option}
                  >
                    <input
                      className="h-5 w-5 accent-pink-500"
                      id={option}
                      value={option}
                      type="checkbox"
                    />
                    <span>{option}</span>
                  </label>
                </div>
              );
            });
          })}
        </div>
      </div>

      <div className="shrink-0 overflow-hidden rounded-xl pt-4">
        <button className="relative w-full overflow-hidden bg-pink-500 py-3 text-sm font-medium text-white transition-colors hover:bg-pink-600">
          <span>APPLY</span>
        </button>
      </div>
    </div>
  );
};

export default Filter;
