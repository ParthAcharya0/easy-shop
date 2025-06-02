import { AUTH_URL } from "@/app/url";
import { setAccessToken } from "@/redux/actions/authAction";
import store from "@/redux/store";
import toast from "react-hot-toast";

async function refreshAccess(refreshToken: string) {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ refreshToken: refreshToken }),
    };
    const res = await fetch(AUTH_URL.refersh_access, options);
    if (!res.ok) throw new Error(res.status.toString());

    const data = await res.json();
    if (data.status !== "success") throw new Error(data.statusCode.toString());

    const newAccess = data.data.accessToken;

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
    console.log(error);
    toast.error("try later");
  }
}

export default refreshAccess;
