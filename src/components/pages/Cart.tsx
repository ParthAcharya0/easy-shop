import { RiHome4Line } from "react-icons/ri";
import BackBtn from "../atoms/Button/BackBtn";
import { Link } from "react-router";
import Button from "../atoms/Button/Button";
import CartCard from "../atoms/card/CartCard";
import SummaryCard from "../atoms/card/SummaryCard";
import HeaderLink from "../atoms/text/HeaderLink";
import AddressCard from "../atoms/card/AddressCard";

const Cart = () => {
  return (
    <div className="flex h-full flex-col rounded-lg">
      <div className="flex shrink-0 items-center justify-between px-3 py-3">
        <BackBtn size={32} />
        <h2 className="heading2">Cart</h2>
        <Link to="/">
          <RiHome4Line size={30} />
        </Link>
      </div>
      <div className="custom-scroll no-scrollbar grow px-3">
        <div>
          <h2 className="heading3">Product Details</h2>
          <div className="flex flex-col gap-2">
            <CartCard />
            <CartCard />
          </div>
          <AddressCard />
          <div className="flex flex-col gap-2 py-3">
            <HeaderLink heading="Payment Type" subHeading="Edit" to="/" />
            <span className="heading2">Cash On Delivery</span>
          </div>
          <div className="">
            <SummaryCard />
          </div>
        </div>
      </div>
      <div className="shrink-0 border-t border-gray-400 px-[18%] pt-8 pb-6">
        <Button to="/">Place Order</Button>
      </div>
    </div>
  );
};

export default Cart;
