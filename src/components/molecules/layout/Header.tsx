import CartBtn from "@/components/atoms/Button/CartButton";
import { IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router";
import { toast } from "react-toastify";

const navLinks = [
  { name: "home", to: "/" },
  { name: "order", to: "/order" },
  { name: "products", to: "/AllPopularProduct" },
  { name: "favorites", to: "/favProduct" },
  // { name: "feed", to: "/" },
  // { name: "profile", to: "/" }
];

const Header = () => {
  return (
    <div className="relative flex items-center justify-between px-3.5 py-4">
      <div className="flex flex-col text-base md:hidden"></div>
      <div className="ml-5 h-fit w-fit md:ml-0">
        <img className="w-20" src="./logo.png" />
      </div>
      <div className="hidden gap-4 text-lg font-medium capitalize md:flex">
        {navLinks.map((link) => (
          <Link key={link.name} to={link.to}>
            {link.name}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4 text-base">
        <CartBtn />
        <button
          className="cursor-pointer hidden sm:block"
          onClick={() => {
            if (window.confirm("Do you want to Logout?")) {
              toast.success("successfully Logout");
              localStorage.clear();
              setTimeout(() => {
                location.reload();
              }, 1000);
            }
          }}
        >
          <IoPersonOutline size={24} />
        </button>
      </div>
    </div>
  );
};

export default Header;
