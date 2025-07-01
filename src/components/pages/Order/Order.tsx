import getOrders from "@/api/getOrder";
import Footer from "@/components/molecules/layout/Footer";
import Tab from "@/components/molecules/tab/Tab";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { Link } from "react-router";

const Order = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getOrders(accessToken, setLoading)
      .then((res) => {
        console.log("ress------->", res);
        setOrders(res ?? []);
      })
      .catch((error) => console.log("error------>", error));
  }, []);

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between px-2 py-4">
        <div></div>
        <h2 className="heading2 ml-8">Orders</h2>
        <Link to="/cart">
          <AiOutlineShopping size={32} />
        </Link>
      </header>

      <main className="flex grow flex-col overflow-hidden">
        {loading ? (
          <p className="flex h-full items-center justify-center text-center font-medium">
            <span className="loader -mt-10 w-2xl"></span>
          </p>
        ) : (
          <Tab ordersData={orders} />
        )}
      </main>
      <Footer activePage={2} />
    </div>
  );
};

export default Order;
