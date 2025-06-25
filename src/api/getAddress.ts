import toast from "react-hot-toast";
import refreshAccess from "./refreshAccess";
import store from "@/redux/store";
import { setAddressList } from "@/redux/actions/addressAction";

const refreshToken =
  localStorage.AUTH_TOKEN && JSON.parse(localStorage.AUTH_TOKEN).refreshToken;

const getAddress = async (accessToken: string) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const res = await fetch(
      "https://instacart-xqwi.onrender.com/addresses",
      options,
    );

    if (!res.ok) throw new Error(res.status.toString());

    const addressList = await res.json();
    if (addressList.status !== "success")
      throw new Error(addressList.statusCode.toString());

    if (!addressList.data) throw new Error(addressList.msg);

    store.dispatch(setAddressList(addressList.data.addressDetails));
    return addressList.data.addressDetails;
  } catch (error: any) {
    // console.log(error?.message);
    if (error.message === "403") {
      const newToken = await refreshAccess(refreshToken);
      console.log(newToken);
      newToken && getAddress(newToken);
    }

    toast.error(error.message);
    return null;
  }
};

export default getAddress;
