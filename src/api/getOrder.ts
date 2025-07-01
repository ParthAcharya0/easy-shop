import toast from "react-hot-toast";
import refreshAccess from "./refreshAccess";

const refreshToken =
  localStorage.AUTH_TOKEN && JSON.parse(localStorage.AUTH_TOKEN).refreshToken;

const getOrders = async (
  accessToken: string,
  loading: (value: React.SetStateAction<boolean>) => void,
) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    loading(true);
    const res = await fetch(
      "https://instacart-xqwi.onrender.com/orders/my-orders",
      options,
    );
    if (!res.ok) throw new Error(res.status.toString());

    const orderList = await res.json();
    if (orderList.status !== "success")
      throw new Error(orderList.statusCode.toString());

    loading(false);
    console.log("object");
    return orderList.data?.current_orders?.pickup_orders?.orders;
  } catch (error: any) {
    console.log(error.message);
    if (error.message === "403") {
      const newToken = await refreshAccess(refreshToken);
      console.log(newToken);
      if (newToken) {
        return await getOrders(newToken, loading);
      }
    }

    toast.error(error.message);
    // return null;
  }
};

export default getOrders;
