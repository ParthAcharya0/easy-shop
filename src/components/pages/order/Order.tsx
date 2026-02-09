import { getOrders } from "@/api/order";
import BackBtn from "@/components/atoms/button/BackButton";
import Footer from "@/components/molecules/layout/Footer";
import Tab from "@/components/molecules/tab/Tab";
import { useEffect, useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { Link } from "react-router";

const Order = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getOrders()
      .then((res) => {
        setOrders(res.data.current_orders?.pickup_orders?.orders ?? []);
      })
      .catch((error) => console.log("error------>", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex h-dvh flex-col">
      <header className="flex items-center justify-between px-2 py-4">
        <div>
          <BackBtn size={40} />
        </div>
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
