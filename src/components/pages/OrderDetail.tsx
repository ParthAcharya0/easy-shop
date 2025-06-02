import BackBtn from "../atoms/Button/BackBtn";
// import SummaryCard from "../atoms/card/SummaryCard";
import OrderDetailCard from "../atoms/card/OrderDetailCard";
import AddressCard from "../atoms/card/AddressCard";

const OrderDetail = () => {
  return (
    <div className="flex h-full flex-col rounded-lg">
      <div className="flex shrink-0 items-center justify-between px-5 py-3">
        <BackBtn size={34} />
        <h2 className="heading2">Order details</h2>
        <div></div>
      </div>
      <div className="custom-scroll no-scrollbar grow px-5">
        <div className="flex h-full flex-col">
          <div className="flex flex-col gap-2">
            <OrderDetailCard />
            <OrderDetailCard />
          </div>
          <div className="flex flex-col gap-2 border-b border-gray-300 py-3">
            <h3 className="tetx-sm capitalize">Order ID</h3>
            <span className="heading2 uppercase">Aprpf8564842899j1g5r</span>
          </div>
          <div className="border-b border-gray-300 py-3">
            <AddressCard />
          </div>

          <div className="flex flex-col gap-2 py-3">
            <h3 className="tetx-sm pb-3 capitalize">payment types</h3>
            <span className="heading2">Cash On Delivery</span>
          </div>
          <div className="mt-auto">
            {/* <SummaryCard /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
