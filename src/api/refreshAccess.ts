import { endpoints } from "@/constant/apiConstant";
import { setAccessToken } from "@/redux/actions/authAction";
import store from "@/redux/store";
import { toast } from "react-toastify";
import { privateInstance } from "./axios";
import type { AxiosResponse } from "axios";
import type { ApiResponse } from "./auth";

async function refreshAccess(refreshToken: string) {
  try {
    const res: AxiosResponse<
      ApiResponse<{
        accessToken: string;
      }>
    > = await privateInstance.post(endpoints.REFRESH_TOKEN, {
      refreshToken: refreshToken,
    });

    const newAccess = res.data.data.accessToken;

    localStorage.setItem(
      "AUTH_TOKEN",
      JSON.stringify({
        refreshToken: refreshToken,
        accessToken: newAccess,
      }),
    );

    store.dispatch(setAccessToken(newAccess));
    return newAccess;
  } catch (error: any) {
    if (error.message === "403" && error.message === "401") {
      localStorage.removeItem("AUTH_TOKEN");
      toast.error("Please Login Again");
      return null;
    }
    toast.error("try later");
    throw new Error(error);
  }
}

export default refreshAccess;
