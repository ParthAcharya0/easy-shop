import { endpoints } from "@/constant/apiConstant";
import { setAccessToken } from "@/redux/actions/authAction";
import store from "@/redux/store";
import { publicInstance } from "./axios";
import type { AxiosResponse } from "axios";
import type { ApiResponse } from "./auth";

async function refreshAccess(refreshToken: string) {
  const res: AxiosResponse<
    ApiResponse<{
      accessToken: string;
    }>
  > = await publicInstance.post(endpoints.REFRESH_TOKEN, {
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
}

export default refreshAccess;
