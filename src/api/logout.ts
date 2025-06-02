import { setAccessToken } from "@/redux/actions/authAction";
import { useAppDispatch } from "@/redux/hooks";

export default async function logout(accessToken: string) {
  const dispatch = useAppDispatch();
  try {
    const res = await fetch("http://192.168.31.135:8081/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();
    if (data.success) throw new Error(data.status_code);

    dispatch(setAccessToken(""));
    localStorage.removeItem("AUTH_TOKEN");

    // console.log(data);
  } catch (error: any) {
    // 'Failed to fetch'
    console.log(error, error.message);
    alert("Problem Arise in logout");
  }
}
