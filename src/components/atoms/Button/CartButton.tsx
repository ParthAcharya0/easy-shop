import { useAppSelector } from "@/redux/hooks";
import { AiOutlineShopping } from "react-icons/ai";
import { Link } from "react-router";

const CartBtn = () => {
  const cartItmeCount = useAppSelector((state) => state.cart.length);
  return (
    <Link to="/cart">
      <div className="relative">
        <AiOutlineShopping size={32} />
        {cartItmeCount !== 0 && (
          <div className="absolute -top-1 -right-0.5 rounded-full bg-red-600 w-5 h-5 flex justify-center items-center text-xs text-white font-semibold">
            {cartItmeCount}
          </div>
        )}
      </div>
    </Link>
  );
};

export default CartBtn;
