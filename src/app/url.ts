const BASE = "https://instacart-xqwi.onrender.com";

export const AUTH_URL = {
  login: `${BASE}/login/verify`,
  sendOtpL: `${BASE}/login`,
  register: `${BASE}/register/verify`,
  sendOtpR: `${BASE}/register`,
  resendOtp: `${BASE}/resendOtp`,
  // logout: `${BASE}/auth/logout`,
  refersh_access: `${BASE}/refreshAccessToken`,
};
