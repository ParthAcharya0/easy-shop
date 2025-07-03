import BackBtn from "../../atoms/button/BackButton";
// import SummaryCard from "../atoms/card/SummaryCard";
import OrderDetailCard from "../../atoms/card/OrderDetailCard";
import AddressCard from "../../atoms/card/AddressCard";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import SummaryCard from "@/components/atoms/card/SummaryCard";
import getOrderDetails from "@/api/getOrderDetails";
import { useAppSelector } from "@/redux/hooks";

type OrderDetails = {
  order_id: number;
  order_status: string;
  store_id: number;
  store_name: string;
  store_logo: string;
  country_code: string;
  mobile_number: number;
  created_at: string;
  updated_at: string;
  address: {
    type: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zip_code: string;
    latitude: null;
    longitude: null;
  };
  payment_details: {
    invoice: string;
    status: string;
    type: string;
    actual_subtotal: string;
    final_subtotal: string;
    service_fee: string;
    bag_fee: string;
    pickup_fee: string;
    subtotal: string;
    discount_applied: string;
  };
  items: {
    product_id: number;
    quantity: number;
    price: string;
    title: string;
    image: string;
  }[];
  pickup_day: string;
  pickup_slot: string;
};

function calculateTotal(
  deliveryCharges: number,
  promotion: number,
  cartData: {
    product_id: number;
    quantity: number;
    price: string;
    title: string;
    image: string;
  }[],
): [number, number, string] {
  const total =
    cartData.reduce((total, item) => {
      return total + parseFloat(item.price) * item.quantity;
    }, 0) +
    deliveryCharges -
    promotion;
  return [deliveryCharges, promotion, total.toFixed(2)];
}

const OrderDetail = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<OrderDetails | null>(null);
  const parameter = useParams();
  const orderID = parameter.orderID ?? "";
  const total = orderData && calculateTotal(5, 2.5, orderData?.items);

  useEffect(() => {
    getOrderDetails(accessToken, orderID?.toString(), setLoading).then((res) =>
      setOrderData(res),
    );
  }, []);
  return (
    <div className="flex h-full flex-col rounded-lg">
      <div className="flex shrink-0 items-center justify-between px-5 py-3">
        <BackBtn size={34} />
        <h2 className="heading2 -ml-6">Order details</h2>
        <div></div>
      </div>
      <div className="custom-scroll no-scrollbar grow px-5">
        {loading ? (
          <p className="flex h-full items-center justify-center text-center font-medium">
            <span className="loader -mt-10 w-2xl"></span>
          </p>
        ) : orderData === null ? (
          <div className="flex h-50 items-center justify-center text-lg font-medium">
            <p>No orders</p>
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <div className="flex flex-col gap-2">
              {orderData.items?.map((order) => (
                <OrderDetailCard data={order} />
              ))}
            </div>
            <div className="flex flex-col gap-2 border-b border-gray-300 py-3">
              <h3 className="tetx-sm capitalize">Order ID</h3>
              <span className="heading2 uppercase">{orderData.order_id}</span>
            </div>
            <div className="border-b border-gray-300 py-1">
              <AddressCard
                data={{
                  floor: orderData.address.type,
                  street: `${orderData.address.address}%${orderData.address.city}%${orderData.address.state}%${orderData.address.country}%${orderData.address.zip_code}`,
                }}
              />
            </div>

            <div className="flex flex-col gap-2 py-3">
              <h3 className="tetx-sm pb-3 capitalize">payment types</h3>
              <span className="heading2">Cash On Delivery</span>
            </div>
            <div className="mt-auto">
              {/* @ts-ignore */}
              <SummaryCard data={orderData.items} calculation={total} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;

// const oldOrderDetail = () => {

//   return (
//     <div className="flex h-full flex-col rounded-lg">
//       <div className="flex shrink-0 items-center justify-between px-5 py-3">
//         <BackBtn size={34} />
//         <h2 className="heading2">Order details</h2>
//         <div></div>
//       </div>
//       <div className="custom-scroll no-scrollbar grow px-5">
//         <div className="flex h-full flex-col">
//           <div className="flex flex-col gap-2">
//             <OrderDetailCard />
//             <OrderDetailCard />
//           </div>
//           <div className="flex flex-col gap-2 border-b border-gray-300 py-3">
//             <h3 className="tetx-sm capitalize">Order ID</h3>
//             <span className="heading2 uppercase">Aprpf8564842899j1g5r</span>
//           </div>
//           <div className="border-b border-gray-300 py-3">
//             <AddressCard />
//           </div>

//           <div className="flex flex-col gap-2 py-3">
//             <h3 className="tetx-sm pb-3 capitalize">payment types</h3>
//             <span className="heading2">Cash On Delivery</span>
//           </div>
//           <div className="mt-auto">{/* <SummaryCard /> */}</div>
//         </div>
//       </div>
//     </div>
//   );
// };
