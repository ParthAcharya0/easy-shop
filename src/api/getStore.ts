import toast from "react-hot-toast";
import refreshAccess from "./refreshAccess";
import store from "@/redux/store";
import { setProducts, setStoreData } from "@/redux/actions/storeAction";

const refreshToken =
  localStorage.AUTH_TOKEN && JSON.parse(localStorage.AUTH_TOKEN).refreshToken;

const getStore = async (accessToken: string) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const res = await fetch(
      "https://instacart-xqwi.onrender.com/store/collection/store/1",
      options,
    );
    if (!res.ok) throw new Error(res.status.toString());

    const storeData = await res.json();

    if (storeData.status !== "success")
      throw new Error(storeData.statusCode.toString());

    store.dispatch(setStoreData(storeData.data));
    store.dispatch(setProducts(storeData.data));
  } catch (error: any) {
    console.log(error.message);
    if (error.message === "403") {
      const newToken = await refreshAccess(refreshToken);
      newToken === null && newToken && getStore(newToken);
    }
    toast.error(error.message);
    return null;
  }
};

export default getStore;
