import toast from "react-hot-toast";
import refreshAccess from "./refreshAccess";

const refreshToken =
  localStorage.AUTH_TOKEN && JSON.parse(localStorage.AUTH_TOKEN).refreshToken;

const getOrderDetails = async (
  accessToken: string,
  categoryID: string,
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
      `https://instacart-xqwi.onrender.com/orders/my-orders/orderdetail?orderId=${categoryID}`,
      options,
    );
    if (!res.ok) throw new Error(res.status.toString());

    const orderList = await res.json();
    if (orderList.status !== "success")
      throw new Error(orderList.statusCode.toString());

    loading(false);
    return orderList.data?.orderData;
  } catch (error: any) {
    console.log(error.message);
    if (error.message === "403") {
      const newToken = await refreshAccess(refreshToken);
      console.log(newToken);
      newToken && getOrderDetails(newToken, categoryID, loading);
    }

    toast.error(error.message);
    return null;
  }
};

export default getOrderDetails;
