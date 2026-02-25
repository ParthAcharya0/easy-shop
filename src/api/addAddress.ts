import { toast } from "react-toastify";
import refreshAccess from "./refreshAccess";
import axios from "axios";

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

const addAddress = async (accessToken: string, address: Address) => {
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
      "http://localhost:8080/add-address",
      options,
    );
    if (!res.ok) throw new Error(res.status.toString());

    const address = await res.json();
    if (address.status !== "success")
      throw new Error(address.statusCode.toString());

    toast.success(address.msg);
    return true;
  } catch (error: any) {
    if (error.message === "403") {
      const newToken = await refreshAccess(refreshToken);
      newToken && addAddress(newToken, address);
    }
     if(axios.isAxiosError(error)){
        toast.error(error.response?.data?.msg);
      }else{
        toast.error(error.message ?? "Something went wrong");
      }
    return false;
  }
};

export default addAddress;
