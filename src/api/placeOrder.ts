import toast from "react-hot-toast";
import refreshAccess from "./refreshAccess";
import store from "@/redux/store";
import { emptyCart } from "@/redux/actions/cartAction";

type Order = {
  store_id: number;
  cart_items: {
    product_id: string;
    quantity: number;
  }[];

  country_code: string;
  mobile_number: string;
  payment_mode: string;

  actual_subtotal: number;
  final_subtotal: number;
  service_fee: number;
  bag_fee: number;
  subtotal: number;
  discount_applied: number;
  use_referral_bonus: boolean;

  pickup_address_id: number;
  pickup_day: string;
  pickup_slot: string;
  pickup_fee: number;
};

const refreshToken =
  localStorage.AUTH_TOKEN && JSON.parse(localStorage.AUTH_TOKEN).refreshToken;

const placeOrder = async (
  accessToken: string,
  order: Order,
  loading: (value: React.SetStateAction<boolean>) => void,
) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  };

  try {
    loading(true);
    const res = await fetch(
      "https://instacart-xqwi.onrender.com/orders/checkout",
      options,
    );
    if (!res.ok) throw new Error(res.status.toString());

    const order = await res.json();
    if (order.status !== "success") throw new Error(order.msg.toString());

    loading(false);
    toast.success(order.msg);
    store.dispatch(emptyCart());
    return true;
  } catch (error: any) {
    console.log(error.message);
    if (error.message === "403") {
      const newToken = await refreshAccess(refreshToken);
      console.log(newToken);
      newToken && placeOrder(newToken, order, loading);
    }
    loading(false);
    toast.error(error.message);
    return false;
  }
};

export default placeOrder;
