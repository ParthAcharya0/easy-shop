import { endpoints } from "@/constant/apiConstant";
import { privateInstance } from "./axios";

export interface ApiResponse<T> {
  statusCode: number;
  status: string;
  msg: string;
  data: T;
}

interface LoginWithNumberPayload {
  phoneno: string;
  country_code: string;
}

type LoginWithNumberResponse = ApiResponse<{ otpid: string }>;

export async function loginWithNumber(
  payload: LoginWithNumberPayload,
): Promise<LoginWithNumberResponse> {
  const res = await privateInstance.post(endpoints.SEND_LOGIN_OTP, payload);
  return res.data;
}

interface VerifyLoginOtpPayload {
  phoneno: string;
  country_code: string;
  otpid: string;
  enteredotp: string;
}

export async function verifyLoginOtp(payload: VerifyLoginOtpPayload): Promise<
  ApiResponse<{
    JWTToken: {
      accessToken: string;
      refreshToken: string;
    };
  }>
> {
  const res = await privateInstance.post(endpoints.VERIFY_LOGIN_OTP, payload);
  return res.data;
}

interface RegisterPayload {
  phoneno: string;
  country_code: string;
}

export async function register(payload: RegisterPayload): Promise<
  ApiResponse<{
    otpid: string;
  }>
> {
  const res = await privateInstance.post(endpoints.SEND_REGISTER_OTP, payload);
  return res.data;
}

interface VerifyRegisterOtpPayload {
  first_name:string,
  last_name:string,
  otpid: string;
  enteredotp: string;
  referral_code?: string;
  email: string;
  password: string;
  phoneno: string;
  country_code: string;
}

export async function verifyRegisterOtp(
  payload: VerifyRegisterOtpPayload,
): Promise<
  ApiResponse<{
    JWTToken: {
      accessToken: string;
      refreshToken: string;
    };
  }>
> {
  const res = await privateInstance.post(
    endpoints.VERIFY_REGISTER_OTP,
    payload,
  );
  return res.data;
}

interface Userdetails {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  country_code: string;
  phoneno: number;
  referral_code: string;
  total_earned_amt: string;
  remaining_amt: string;
  is_verify: number;
  phoneNumberStatus: string;
  phoneNumberStatusMessage: string;
}
export async function getUserDetails(): Promise<ApiResponse<Userdetails>> {
  const res = await privateInstance.get(endpoints.USER_INFO);
  return res.data;
}

// export default async function logout(accessToken: string) {
//   const dispatch = store.dispatch;
//   try {
//     const res = await fetch("http://localhost:8080/api/auth/logout", {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     const data = await res.json();
//     if (data.success) throw new Error(data.status_code);

//     dispatch(setAccessToken(""));
//     localStorage.removeItem("AUTH_TOKEN");

//     // console.log(data);
//   } catch (error: any) {
//     // 'Failed to fetch'
//     console.log(error, error.message);
//     alert("Problem Arise in logout");
//   }
// }
