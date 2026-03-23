import Menu from "@/components/atoms/menus/Menu";
import { toast } from "react-toastify";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineFeed } from "react-icons/md";
import { RiHome4Line } from "react-icons/ri";
import { FaProductHunt } from "react-icons/fa";

const Footer = ({ activePage = 0 }: { activePage?: number }) => {
  function logOut() {
    if (window.confirm("Do you want to Logout?")) {
      toast.success("successfully Logout");
      localStorage.clear()
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/50 backdrop-blur-2xl md:hidden">
      <div className="mx-auto flex w-[85%] justify-between gap-2 py-2">
        <Menu active={activePage === 1} to="/">
          <RiHome4Line size={24} />
        </Menu>
        <Menu active={activePage === 2} label="Order" to="/order" />
        <Menu active={activePage === 3} label="Product" to="/AllPopularProduct">
          <FaProductHunt size={24} />
        </Menu>
        <Menu active={activePage === 4} label="favorites" to="/favProduct">
          <MdOutlineFeed size={24} />
        </Menu>
        <button onClick={logOut}>
          <Menu active={activePage === 5} label="Profile" to="/">
            <IoPersonOutline size={24} />
          </Menu>
        </button>
      </div>
    </div>
  );
};

export default Footer;
