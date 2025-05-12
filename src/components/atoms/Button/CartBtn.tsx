import { AiOutlineShopping } from "react-icons/ai";
import { Link } from "react-router";

const CartBtn = () => {
  return (
    <Link to="/cart">
      <AiOutlineShopping size={32} />
    </Link>
  );
};

export default CartBtn;
