import { useState } from "react";
import SearchInput from "./components/atoms/Input/SearchInput";
import Menu from "./components/atoms/menus/Menu";
import ProductCard from "./components/atoms/card/ProductCard";
import CartCard from "./components/atoms/card/CartCard";
import HeaderLink from "./components/atoms/text/HeaderLink";
import OrderCard from "./components/atoms/card/OrderCard";
import SummaryCard from "./components/atoms/card/SummaryCard";
import AddressCard from "./components/atoms/card/AddressCard";

function Demo() {
  return (
    <div className="custom-scroll no-scrollbar flex h-full flex-col gap-2 overflow-y-auto py-8">
      <div className="border border-amber-500 py-3">
        {/* <InputLable label="first name" placeholder="enter frist name" /> */}
      </div>
      <h1 className="heading1">hello</h1>
      <h3 className="heading2">hello</h3>
      <h3 className="heading3">hello</h3>
      <p className="sub-heading">sub heading</p>
      <p className="base-text1">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio,
        aspernatur quisquam temporibus natus magnam officia itaque repellendus
        suscipit? Rem suscipit reiciendis sequi perspiciatis unde obcaecati
        ullam culpa fugit amet reprehenderit.
      </p>
      <p className="base-text2">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta
        asperiores magnam excepturi cupiditate doloremque fugit esse temporibus,
        consequuntur distinctio perspiciatis libero odio aut deleniti eius
        aspernatur corrupti suscipit sint inventore?
      </p>
      <p className="base-text3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error dolor
        quas aliquam asperiores officiis porro, dicta qui ad voluptate, et
        libero inventore cumque? Aperiam enim, quibusdam harum dolore fugiat
        explicabo.
      </p>
      <div className="flex justify-between">
        <HeaderLink heading="sdv" subHeading="dsdv" to="/" />
      </div>
      <div className="border border-amber-500 py-5">
        <SearchInput />
      </div>
      <div className="border border-amber-500 py-5">
        <Menu />
      </div>
      <div className="border border-amber-500 py-3">
        <ProductCard />
      </div>
      {/* <div className="border border-amber-500 py-3">
        <ProductCard1 />
      </div>
      <div className="border border-amber-500 py-3">
        <CategoryCard />
      </div> */}
      <div className="border border-amber-500 py-3">
        <CartCard />
      </div>
      <div className="border border-amber-500 py-3">
        <OrderCard />
      </div>
      <div className="border border-amber-500 py-3">
        <SummaryCard />
      </div>
      <div className="border border-amber-500 py-3">
        <AddressCard />
      </div>
      <div className="border border-amber-500 py-3">
        <Count />
        <Count />
      </div>
    </div>
  );
}

function Count() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h3>{count}</h3>
      {count && <span>hello</span>}
      <button
        className="bg-red-500 p-4 text-white"
        onClick={() => setCount(count + 1)}
      >
        ++
      </button>
    </div>
  );
}

export default Demo;
