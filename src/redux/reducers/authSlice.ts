export interface User {
  country_code: string;
  email: null;
  firstName: null;
  is_verify: number;
  lastName: null;
  phoneNumberStatus: string;
  phoneNumberStatusMessage: string;
  phoneno: number;
  referral_code: string;
  remaining_amt: string;
  total_earned_amt: string;
}

type AuthState = {
  accessToken: string;
  isUserAuth: boolean;
  userInfo: User | {};
};

// @ts-ignore
type Action = { type: string; payload: any };

let access_token: string = "";
const tokenData = localStorage.getItem("AUTH_TOKEN");

if (tokenData) {
  try {
    const parsed = JSON.parse(tokenData);
    access_token = parsed?.accessToken ?? "";

    !access_token && localStorage.removeItem("AUTH_TOKEN");
  } catch (e) {
    console.error("Tokens are not found", e);
  }
}

const initialState = {
  accessToken: access_token,
  isUserAuth: access_token ? true : false,
  userInfo: {},
};

export default function authReducer(
  state: AuthState = initialState,
  action: Action,
): AuthState {
  switch (action.type) {
    case "auth/setAccessToken":
      return { ...state, isUserAuth: true, accessToken: action.payload };

    case "auth/setUserInfo":
      return { ...state, userInfo: action.payload };

    default:
      return state;
  }
}
