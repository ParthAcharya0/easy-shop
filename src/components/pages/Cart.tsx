import { RiHome4Line } from "react-icons/ri";
import BackBtn from "../atoms/button/BackButton";
import { Link, useNavigate } from "react-router";
import Button from "../atoms/button/Button";
import CartCard, { type Cart } from "../atoms/card/CartCard";
import SummaryCard from "../atoms/card/SummaryCard";
import HeaderLink from "../atoms/text/HeaderLink";
import AddressCard from "../atoms/card/AddressCard";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";
import { User } from "@/redux/reducers/authSlice";
import { useState } from "react";
import { placeOrder } from "@/api/order";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

function calculateTotal(
  deliveryCharges: number,
  promotion: number,
  cartData: Cart[]
): [number, number, string] {
  const total =
    cartData.reduce((total, item) => total + parseFloat(item.selling_price) * item.quantity, 0) +
    deliveryCharges -
    promotion;
  return [deliveryCharges, promotion, total.toFixed(2)];
}

const CartPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const auth = useAppSelector((state) => state.auth);
  const userInfo: Partial<User> = auth.userInfo;
  const cartData = useAppSelector((state) => state.cart);
  const address = useAppSelector((state) => state.address.selectedAddress);
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();
  const [deliveryCharges, promotion, total] = calculateTotal(5, 2.5, cartData);

  const handleSubmit = async () => {
    setLoading(true);

    if (!Object.keys(address).length) {
      toast(
        ({ closeToast }) => (
          <div className="flex flex-col gap-2 p-4 text-lg font-medium text-black">
            <span className="capitalize">
              You have not selected an address yet! Add one?
            </span>
            <div className="flex cursor-pointer justify-end gap-3">
              <button
                className="rounded-lg bg-pink-600 px-4 py-2 text-base text-white"
                onClick={() => {
                  closeToast();
                  navigator("/address");
                }}
              >
                Add
              </button>
              <button className="cursor-pointer" onClick={closeToast}>
                Cancel
              </button>
            </div>
          </div>
        ),
        { autoClose: false, toastId: "address", closeButton: false, draggable: false }
      );
      setLoading(false);
      return;
    }

    const orderDetails = {
      store_id: 1,
      cart_items: cartData.map((item) => ({ product_id: item.id.toString(), quantity: item.quantity })),
      country_code: userInfo.country_code?.toString() ?? "+91",
      mobile_number: userInfo.phoneno?.toString() ?? "+91",
      payment_mode: "Card",
      actual_subtotal: parseFloat(total) - deliveryCharges - promotion,
      final_subtotal: parseFloat(total) - deliveryCharges - promotion,
      service_fee: 0,
      bag_fee: 0,
      subtotal: parseFloat(total),
      discount_applied: promotion,
      use_referral_bonus: false,
      pickup_address_id: 1,
      pickup_day: new Date().toDateString(),
      pickup_slot: "11:35-11:45pm",
      pickup_fee: deliveryCharges,
    };

    try {
      const res = await placeOrder(orderDetails);
      const clientSecret = res.data.paymentIntent_client_secret;

      const cardElement = elements?.getElement(CardElement);
      if (!stripe || !cardElement) {
        toast("Payment cannot be processed. Please try again.");
        setLoading(false);
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: userInfo?.firstName || "Customer Name" },
        },
      });

      if (result.error) {
        toast(result.error.message);
      } else if (result.paymentIntent?.status === "succeeded") {
        toast("Payment succeeded!");
        navigator("/");
      }
    } catch (err: any) {
      console.error(err);
      toast("Something went wrong! Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cartData.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-2xl font-semibold min-h-dvh">
        <div className="flex shrink-0 items-center justify-between px-3 py-3 w-full">
          <BackBtn size={32} to={"/"} />
          <h2 className="heading2">Cart</h2>
          <Link to="/"><RiHome4Line size={30} /></Link>
        </div>
        <span className="grow flex justify-center items-center">No Products Added Yet</span>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-lg">
      <div className="flex shrink-0 items-center justify-between px-3 py-3 w-full">
        <BackBtn size={32} to="/" />
        <h2 className="heading2">Cart</h2>
        <Link to="/"><RiHome4Line size={30} /></Link>
      </div>

      <div className="custom-scroll no-scrollbar grow px-3">
        <h2 className="heading3">Product Details</h2>
        <div className="flex flex-col gap-2">
          {cartData.map((item, id) => <CartCard key={id} data={item} />)}
        </div>

        <div className="pt-3">
          <HeaderLink heading="Address" subHeading={Object.keys(address).length === 0 ? "Add" : "Edit"} to="/address" />
          {Object.keys(address).length === 0 ? (
            <p className="flex h-40 items-center justify-center text-center font-medium">
              <span>No Selected Address Yet</span>
            </p>
          ) : (
            <AddressCard data={address} />
          )}
        </div>

        <div className="flex flex-col gap-2 py-3">
          <HeaderLink heading="Payment Type" subHeading="Edit" to="/" />
          <span className="text-2xl font-medium text-black">Card Payment</span>
        </div>

        <div className="my-4">
          <h3 className="heading3 mb-2">Payment Info</h3>
          <CardElement
            options={{
              style: {
                base: { fontSize: "16px", color: "#000" },
                invalid: { color: "#fa755a" },
              },
            }}
          />
        </div>

        <SummaryCard data={cartData} calculation={[deliveryCharges, promotion, total]} />
      </div>

      <div className="shrink-0 border-t border-gray-400 px-[18%] pt-8 pb-6">
        <Button state={loading} eventHandler={handleSubmit}>
          {loading ? "Processing..." : "Place Order"}
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
