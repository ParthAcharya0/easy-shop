import toast from "react-hot-toast";
import refreshAccess from "./refreshAccess";

const refreshToken =
  localStorage.AUTH_TOKEN && JSON.parse(localStorage.AUTH_TOKEN).refreshToken;

const searchProducts = async (accessToken: string, query: string) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const res = await fetch(
      `https://instacart-xqwi.onrender.com/store/inside/search?query=${query}&storeId=1&page=1`,
      options,
    );
    // console.log(res);
    // if (!res.ok) throw new Error(res.status.toString());
    const storeData = await res.json();

    if (storeData.status !== "success")
      throw new Error(storeData.msg.toString());

    return storeData;
  } catch (error: any) {
    console.log(error.message);
    if (error.message === "403") {
      const newToken = await refreshAccess(refreshToken);
      newToken === null && newToken && searchProducts(newToken, query);
    }
    toast.error(error.message);
    return null;
  }
};

export default searchProducts;
