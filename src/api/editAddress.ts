import toast from "react-hot-toast";
import refreshAccess from "./refreshAccess";

interface Address {
  street: string;
  floor: string;
  zip_code: string;
  business_name?: string;
  latitude?: string;
  longitude?: string;
}

const refreshToken =
  localStorage.AUTH_TOKEN && JSON.parse(localStorage.AUTH_TOKEN).refreshToken;

const editAddress = async (
  accessToken: string,
  address: Address,
  addressID: number,
) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  };

  try {
    const res = await fetch(
      `https://instacart-xqwi.onrender.com/addresses/${addressID}/edit-address`,
      options,
    );
    if (!res.ok) throw new Error(res.status.toString());

    const address = await res.json();
    if (address.status !== "success")
      throw new Error(address.statusCode.toString());

    toast.success(address.msg);
    return true;
  } catch (error: any) {
    console.log(error.message);
    if (error.message === "403") {
      const newToken = await refreshAccess(refreshToken);
      console.log(newToken);
      newToken && editAddress(newToken, address, addressID);
    }
    toast.error(error.message);
    return false;
  }
};

export default editAddress;
