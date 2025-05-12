import OrderCard from "@/components/atoms/card/OrderCard";
import Footer from "@/components/molecules/layout/Footer";
import { useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { Link } from "react-router";

const Order = () => {
  const [tab, setTab] = useState(1);
  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between px-2 py-4">
        <div></div>
        <h2 className="heading2 ml-8">Orders</h2>
        <div>
          <Link to="/cart">
            <AiOutlineShopping size={32} />
          </Link>
        </div>
      </header>

      <main className="flex grow flex-col overflow-hidden">
        <section className="relative z-0 mx-auto flex w-full max-w-[80%] shrink-0 overflow-hidden rounded-full border border-gray-200 mb-5 text-center text-white">
          <button
            className={`grow cursor-pointer px-2 py-4 capitalize transition-colors duration-300 ${tab === 2 && "text-black"}`}
            onClick={() => setTab(1)}
          >
            confirmed orders
          </button>
          <button
            onClick={() => setTab(2)}
            className={`grow cursor-pointer px-2 py-4 capitalize transition-colors duration-300 ${tab === 1 && "text-black"}`}
          >
            returned orders
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
                <OrderCard />
                <OrderCard />
              </div>
              <div>
                <h3 className="heading3 py-2 capitalize">past order</h3>
                <OrderCard />
                <OrderCard />
              </div>
            </div>
          ) : (
            <div>
              <OrderCard type="returnOrder" />
              <OrderCard type="returnOrder" />
            </div>
          )}
        </section>
      </main>
      <Footer activePage={2} />
    </div>
  );
};

export default Order;
