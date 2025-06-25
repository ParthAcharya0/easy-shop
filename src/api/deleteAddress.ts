import toast from "react-hot-toast";
import refreshAccess from "./refreshAccess";
import getAddress from "./getAddress";

const refreshToken =
  localStorage.AUTH_TOKEN && JSON.parse(localStorage.AUTH_TOKEN).refreshToken;

const deleteAddress = async (accessToken: string, addressID: number) => {
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await fetch(
      `https://instacart-xqwi.onrender.com/addresses/${addressID}/delete-address`,
      options,
    );
    console.log(res);
    if (!res.ok) throw new Error(res.status.toString());

    const address = await res.json();
    if (address.status !== "success")
      throw new Error(address.statusCode.toString());

    toast.success(address.msg);
    getAddress(accessToken);
    return true;
  } catch (error: any) {
    console.log(error.message);
    if (error.message === "403") {
      const newToken = await refreshAccess(refreshToken);
      console.log(newToken);
      newToken && deleteAddress(newToken, addressID);
    }
    toast.error(error.message);
    return false;
  }
};

export default deleteAddress;
