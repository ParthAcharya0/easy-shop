import Menu from "@/components/atoms/menus/Menu";
import toast from "react-hot-toast";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineFeed, MdOutlineRocketLaunch } from "react-icons/md";
import { RiHome4Line } from "react-icons/ri";

const Footer = ({ activePage = 0 }: { activePage?: number }) => {
  function logOut() {
    if (window.confirm("Do you want to Logout?")) {
      toast.success("successfully Logout");
      localStorage.removeItem("AUTH_TOKEN");
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  }

  return (
    <div className="mx-auto flex w-[85%] justify-between gap-2 py-2">
      <Menu active={activePage === 1} to="/">
        <RiHome4Line size={24} />
      </Menu>
      <Menu active={activePage === 2} label="Order" to="/order" />
      <Menu active={activePage === 3} label="explore">
        <MdOutlineRocketLaunch size={24} />
      </Menu>
      <Menu active={activePage === 4} label="feed">
        <MdOutlineFeed size={24} />
      </Menu>
      <button onClick={logOut}>
        <Menu active={activePage === 5} label="Profile" to="/">
          <IoPersonOutline size={24} />
        </Menu>
      </button>
    </div>
  );
};

export default Footer;
