import CartBtn from "@/components/atoms/button/CartButton";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router";

const Header = () => {
  return (
    <div className="relative flex items-center justify-between px-3.5 py-4">
      <div className="flex flex-col text-base md:hidden">
        {/* <span className="text-sm text-gray-400">Location</span>
        <select
          className="-ml-1 cursor-pointer pr-1.5"
          name="location"
          id="location"
        >
          <option value="New-York">New York, USA</option>
          <option value="New-York">ACV, USA</option>
          <option value="New-York">CBS, USA</option>
        </select> */}
      </div>
      <div className="h-fit w-fit ml-20 md:ml-0">
        <img className="w-20" src="./logo.png" />
      </div>
      <div className="md:flex gap-4 text-lg font-medium capitalize hidden">
        <Link to="/">home</Link>
        <Link to="/order">order</Link>
        <Link to="/AllPopularProduct">Product</Link>
        <Link to="/">feed</Link>
        <Link to="/">Profile</Link>
      </div>
      <div className="flex items-center gap-4 text-base">
        <Link to="/favProduct">
          <CiHeart size={32} />
        </Link>
        <CartBtn />
      </div>
    </div>
  );
};

export default Header;
