type AuthState = {
  accessToken: string;
  isUserAuth: boolean;
};

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
};

export default function authReducer(
  state: AuthState = initialState,
  action: Action,
): AuthState {
  switch (action.type) {
    case "auth/setAccessToken":
      return { isUserAuth: true, accessToken: action.payload };

    default:
      return state;
  }
}
