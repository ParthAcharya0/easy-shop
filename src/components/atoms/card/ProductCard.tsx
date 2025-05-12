import { FaStar } from "react-icons/fa";
import LikeBtn from "../Button/LikeBtn";
import { AiOutlineShopping } from "react-icons/ai";
import { RiDiscountPercentFill } from "react-icons/ri";

const ProductCard = () => {
  return (
    <div className="relative z-0 flex h-56 w-full flex-col justify-between rounded-md bg-red-600 p-2.5 text-white">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1 rounded-md bg-[rgba(255,255,255,0.30)] px-2 py-1 backdrop-blur-sm">
          <FaStar />
          <span>3.9</span>
        </div>
        <LikeBtn />
      </div>
      <div className="rounded-md bg-[rgba(255,255,255,0.18)] px-3 py-2.5 text-base backdrop-blur-xs">
        <h4 className="pb-1.5 font-medium capitalize">red Nike</h4>
        <div className="flex items-center justify-between gap-2 text-xs font-light">
          <div className="flex flex-col gap-1">
            <span>$17.00</span>
            <span className="inline-flex items-center gap-1">
              <RiDiscountPercentFill />
              10% <span className="font-medium">off</span>
            </span>
          </div>
          <div className="rounded-md bg-[rgba(255,255,255,0.12)] p-2 text-base backdrop-blur-sm">
            <AiOutlineShopping />
          </div>
        </div>
      </div>
      <div className="img-holder absolute inset-0 z-[-1] w-full overflow-hidden rounded-md">
        <img
          className="aspect-square h-full w-full object-cover object-center"
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
    </div>
  );
};

export default ProductCard;
