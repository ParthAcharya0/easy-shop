import Menu from "@/components/atoms/menus/Menu";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineFeed, MdOutlineRocketLaunch } from "react-icons/md";
import { RiHome4Line } from "react-icons/ri";

const Footer = ({ activePage = 0 }: { activePage?: number }) => {
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
      <Menu active={activePage === 5} label="Profile" to="/login">
        <IoPersonOutline size={24} />
      </Menu>
    </div>
  );
};

export default Footer;
