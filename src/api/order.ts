import { endpoints } from "@/constant/apiConstant";
import { privateInstance } from "./axios";
import type { ApiResponse } from "./auth";

export interface OrderItem {
  product_id: string;
  quantity: number;
}

export interface OrderDetail {
  order_id: number
  order_status: string
  store_id: number
  store_name: string
  store_logo: string
  country_code: string
  mobile_number: number
  created_at: string
  updated_at: string
  address: Address
  payment_details: PaymentDetails
  items: Item[]
  pickup_day: string
  pickup_slot: string
}

export interface Address {
  type: string
  address: string
  city: string
  state: string
  country: string
  zip_code: string
  latitude: any
  longitude: any
}

export interface PaymentDetails {
  invoice: string
  status: string
  type: string
  actual_subtotal: string
  final_subtotal: string
  service_fee: string
  bag_fee: string
  pickup_fee: string
  subtotal: string
  discount_applied: string
}

export interface Item {
  product_id: number
  quantity: number
  price: string
  title: string
  image: string
}


export interface PlaceOrderPayload {
  store_id: number;
  cart_items: OrderItem[];

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
}

export type OrderListResponse = ApiResponse<{
  current_orders?: {
    pickup_orders?: {
      orders: any[];
    };
  };
}>;

export type OrderDetailsResponse = ApiResponse<{
  orderData: OrderDetail;
}>;

// GET: My Orders
export const getOrders = async (): Promise<OrderListResponse> => {
  const res = await privateInstance.get(endpoints.MY_ORDERS);
  return res.data;
};

// GET: Order Details
export const getOrderDetails = async (
  orderId: string,
): Promise<OrderDetailsResponse> => {
  const res = await privateInstance.get(endpoints.ORDER_DETAILS, {
    params: { orderId },
  });
  return res.data;
};

// POST: Place Order
export const placeOrder = async (
  payload: PlaceOrderPayload,
): Promise<
  ApiResponse<{
    order_id: number;
    paymentIntent_id: string;
    paymentIntent_client_secret: string;
  }>
> => {
  const res = await privateInstance.post(endpoints.PLACE_ORDER, payload);
  return res.data;
};
