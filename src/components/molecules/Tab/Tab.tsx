import OrderCard from "@/components/atoms/card/OrderCard";
import { useState } from "react";

export type Order = {
  items_count: number;
  order_id: number;
  order_status: string;
  pickup_day: string;
  pickup_slot: string;
  subtotal: string;
};

const Tab = ({ ordersData }: { ordersData: Order[] }) => {
  const [tab, setTab] = useState(1);
  const today = new Date().toDateString();
  // const todayDate = `${today[2]} ${today[1]}`;
  const currentOrder = ordersData.filter(
    (order) => order.pickup_day === today,
  );
  console.log(currentOrder, today)
  const pastOrder = ordersData.filter(
    (order) => order.pickup_day !== today,
  );

  return (
    <>
      <section className="relative z-0 mx-auto mb-5 flex w-full max-w-[80%] shrink-0 overflow-hidden rounded-full border border-gray-200 text-center text-white">
        <button
          className={`grow cursor-pointer px-2 py-4 capitalize transition-colors duration-300 ${tab === 2 && "text-black"}`}
          onClick={() => setTab(1)}
        >
          Pending orders
        </button>
        <button
          onClick={() => setTab(2)}
          className={`grow cursor-pointer px-2 py-4 capitalize transition-colors duration-300 ${tab === 1 && "text-black"}`}
        >
          confirmed orders
        </button>
        <div
          className={`"left-0" absolute top-0 transition-all duration-300 ${tab === 1 ? "translate-x-0" : "translate-x-[99%]"} bottom-0 z-[-1] w-[50%] rounded-full bg-pink-500`}
        ></div>
      </section>
      <section className="custom-scroll no-scrollbar grow px-4 pb-5">
        {tab === 1 ? (
          <div className="flex flex-col gap-2.5">
            <div>
              <h3 className="heading3 py-2 capitalize">Current order</h3>
              {currentOrder.length === 0 ? (
                <div className="flex h-50 items-center justify-center text-lg font-medium">
                  <p>No orders</p>
                </div>
              ) : (
                currentOrder.map((order, i) => (
                  <OrderCard key={i} data={order} />
                ))
              )}
            </div>
            <div>
              <h3 className="heading3 py-2 capitalize">past order</h3>
              {pastOrder.length === 0 ? (
                <div className="flex h-50 items-center justify-center text-lg font-medium">
                  <p>No orders</p>
                </div>
              ) : (
                pastOrder.map((order, i) => <OrderCard key={i} data={order} />)
              )}
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-lg font-medium">
            <p>No orders</p>
          </div>
        )}
      </section>
    </>
  );
};

export default Tab;
