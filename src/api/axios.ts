import axios from "axios";
import refreshAccess from "./refreshAccess";

export const privateInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

privateInstance.interceptors.request.use((config) => {
  const stored = localStorage.getItem("AUTH_TOKEN");

  const tokenData = stored ? JSON.parse(stored) : null;
  if (tokenData) {
    config.headers.setAuthorization(`Bearer ${tokenData.accessToken}`);
  }
  return config;
});

privateInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ============================
    // 1️⃣ Frontend is offline
    // ============================
    if (!navigator.onLine) {
      return Promise.reject({
        type: "OFFLINE_ERROR",
        message:
          "You appear to be offline. Please check your internet connection.",
        originalError: error,
      });
    }

    // ============================
    // 2️⃣ No response from server
    // (network / CORS / backend down)
    // ============================
    if (error.code === "ERR_NETWORK" || !error.response) {
      return Promise.reject({
        type: "NETWORK_ERROR",
        message: "Unable to reach the server. Please try again later.",
        originalError: error,
      });
    }

    // ============================
    // 3️⃣ Auth error → refresh token
    // ============================
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const stored = localStorage.getItem("AUTH_TOKEN");
        const tokenData = stored ? JSON.parse(stored) : null;

        if (!tokenData?.refreshToken) {
          throw new Error("Missing refresh token");
        }

        const newAccessToken = await refreshAccess(tokenData.refreshToken);

        // update token everywhere
        localStorage.setItem(
          "AUTH_TOKEN",
          JSON.stringify({
            ...tokenData,
            accessToken: newAccessToken,
          }),
        );

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return privateInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject({
          type: "AUTH_ERROR",
          message: "Session expired. Please log in again.",
          originalError: refreshError,
        });
      }
    }

    // ============================
    // 4️⃣ Normal HTTP errors
    // ============================
    const { status, data } = error.response;

    return Promise.reject({
      type: "HTTP_ERROR",
      status,
      message: data?.message || "Something went wrong. Please try again.",
      originalError: error,
    });
  },
);
