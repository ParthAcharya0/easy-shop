import toast from "react-hot-toast";
import refreshAccess from "./refreshAccess";

const refreshToken =
  localStorage.AUTH_TOKEN && JSON.parse(localStorage.AUTH_TOKEN).refreshToken;

const getUserInfo = async (accessToken: string) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const res = await fetch(
      "https://instacart-xqwi.onrender.com/userprofile/information",
      options,
    );
    if (!res.ok) throw new Error(res.status.toString());

    const userData = await res.json();
    if (userData.status !== "success")
      throw new Error(userData.statusCode.toString());

    if (userData.status !== "success")
      throw new Error(userData.statusCode.toString());

    console.log(userData.data.userData);
  } catch (error: any) {
    console.log(error.message);
    if (error.message === "403") {
      const newToken = await refreshAccess(refreshToken);
      console.log(newToken);
      newToken && getUserInfo(newToken);
    }

    toast.error(error.message);
    return null;
  }
};

export default getUserInfo;
