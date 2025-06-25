import { RiHome4Line } from "react-icons/ri";
import BackBtn from "../atoms/Button/BackBtn";
import { Link, useNavigate } from "react-router";
import Button from "../atoms/Button/Button";
import CartCard, { type Cart } from "../atoms/card/CartCard";
import SummaryCard from "../atoms/card/SummaryCard";
import HeaderLink from "../atoms/text/HeaderLink";
import AddressCard from "../atoms/card/AddressCard";
import { useAppSelector } from "@/redux/hooks";
import toast from "react-hot-toast";
import { User } from "@/redux/reducers/authSlice";
import { useState } from "react";
import placeOrder from "@/api/placeOrder";

function calculateTotal(
  deliveryCharges: number,
  promotion: number,
  cartData: Cart[],
): [number, number, string] {
  const total =
    cartData.reduce((total, item) => {
      return total + parseFloat(item.selling_price) * item.quantity;
    }, 0) +
    deliveryCharges -
    promotion;
  return [deliveryCharges, promotion, total.toFixed(2)];
}

const Cart = () => {
  const auth = useAppSelector((state) => state.auth);
  const accessToken = auth.accessToken;
  const userInfo: Partial<User> = auth.userInfo;
  const cartData = useAppSelector((state) => state.cart);
  const address = useAppSelector((state) => state.address.selectedAddress);
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();
  const [deliveryCharges, promotion, total] = calculateTotal(5, 2.5, cartData);

  function handleSubmit() {
    setLoading(true);
    const today = new Date();
    // const twoDaysLater = new Date(today);
    // twoDaysLater.setDate(today.getDate() + 2);

    if (!Object.keys(address).length) {
      toast(
        (t) => (
          <div className="flex flex-col gap-2 p-4 text-lg font-medium text-black">
            <span className="capitalize">
              you not selected Address yet! do you wanted to add?
            </span>
            <div className="flex cursor-pointer justify-end gap-3">
              <button
                className="cursor-pointer rounded-lg bg-pink-600 px-4 py-2 text-base text-white"
                onClick={() => {
                  toast.dismiss(t.id);
                  navigator("/address");
                }}
              >
                Add
              </button>
              <button
                className="cursor-pointer"
                onClick={() => toast.dismiss(t.id)}
              >
                Cancel
              </button>
            </div>
          </div>
        ),
        { duration: Infinity, id: "address" },
      );
      return;
    }

    const orderDetails = {
      store_id: 1,
      cart_items: cartData.map((item) => {
        return { product_id: item.id.toString(), quantity: item.quantity };
      }),

      country_code: userInfo.country_code?.toString() ?? "+91",
      mobile_number: userInfo.phoneno?.toString() ?? "+91",
      payment_mode: "Google Pay",

      actual_subtotal: parseFloat(total) - deliveryCharges - promotion,
      final_subtotal: parseFloat(total) - deliveryCharges - promotion,
      service_fee: 0,
      bag_fee: 0,
      subtotal: parseFloat(total),
      discount_applied: promotion,
      use_referral_bonus: false,

      pickup_address_id: 1,
      pickup_day: `${today.toDateString().split(" ")[2]} ${today.toDateString().split(" ")[1]}`,
      pickup_slot: "11:35-11:45pm",
      pickup_fee: deliveryCharges,
    };

    placeOrder(accessToken, orderDetails, setLoading);
  }

  if (cartData.length === 0) {
    return (
      <>
        <div className="flex shrink-0 items-center justify-between px-3 py-3">
          <BackBtn size={32} />
          <h2 className="heading2">Cart</h2>
          <Link to="/">
            <RiHome4Line size={30} />
          </Link>
        </div>
        <div className="flex h-[80%] items-center justify-center text-2xl font-semibold">
          <span>No Product Added Yet</span>
        </div>
      </>
    );
  }
  return (
    <div className="flex h-full flex-col rounded-lg">
      <div className="flex shrink-0 items-center justify-between px-3 py-3">
        <BackBtn size={32} to="/" />
        <h2 className="heading2">Cart</h2>
        <Link to="/">
          <RiHome4Line size={30} />
        </Link>
      </div>
      <div className="custom-scroll no-scrollbar grow px-3">
        <div>
          <h2 className="heading3">Product Details</h2>
          <div className="flex flex-col gap-2">
            {cartData.map((item, id) => (
              <CartCard key={id} data={item} />
            ))}
          </div>
          <div className="pt-3">
            <HeaderLink
              heading="Address"
              subHeading={Object.keys(address).length === 0 ? "Add" : "Edit"}
              to="/address"
            />
            {Object.keys(address).length === 0 ? (
              <p className="flex h-40 items-center justify-center text-center font-medium">
                <span className="w-2xl">No Selected Address Yet</span>
              </p>
            ) : (
              <AddressCard data={address} />
            )}
          </div>
          <div className="flex flex-col gap-2 py-3">
            <HeaderLink heading="Payment Type" subHeading="Edit" to="/" />
            <span className="text-2xl font-medium text-black">
              Cash On Delivery
            </span>
          </div>
          <div className="">
            <SummaryCard
              data={cartData}
              calculation={[deliveryCharges, promotion, total]}
            />
          </div>
        </div>
      </div>
      {loading ? (
        <div className="shrink-0 border-t border-gray-400 px-[18%] pt-8 pb-6">
          <Button state={true}>Loading</Button>
        </div>
      ) : (
        <div className="shrink-0 border-t border-gray-400 px-[18%] pt-8 pb-6">
          <Button eventHandler={handleSubmit}>Place Order</Button>
        </div>
      )}
    </div>
  );
};

export default Cart;

// const oldCart = () => {
//   return (
//     <div className="flex h-full flex-col rounded-lg">
//       <div className="flex shrink-0 items-center justify-between px-3 py-3">
//         <BackBtn size={32} />
//         <h2 className="heading2">Cart</h2>
//         <Link to="/">
//           <RiHome4Line size={30} />
//         </Link>
//       </div>
//       <div className="custom-scroll no-scrollbar grow px-3">
//         <div>
//           <h2 className="heading3">Product Details</h2>
//           <div className="flex flex-col gap-2">
//             <CartCard />
//             <CartCard />
//           </div>
//           <AddressCard />
//           <div className="flex flex-col gap-2 py-3">
//             <HeaderLink heading="Payment Type" subHeading="Edit" to="/" />
//             <span className="heading2">Cash On Delivery</span>
//           </div>
//           <div className="">
//             <SummaryCard />
//           </div>
//         </div>
//       </div>
//       <div className="shrink-0 border-t border-gray-400 px-[18%] pt-8 pb-6">
//         <Button to="/">Place Order</Button>
//       </div>
//     </div>
//   );
// };
