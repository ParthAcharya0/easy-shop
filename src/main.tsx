import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import Router from "./app/Routes.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
    <Toaster
      position="top-center"
      gutter={8}
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: "",
        duration: 5000,
        removeDelay: 1000,
        style: {
          background: "#fff",
          color: "#363636",
        },

        // Default options for specific types
        success: {
          duration: 3000,
          iconTheme: {
            primary: "green",
            secondary: "white",
          },
        },
        error: {
          duration: 3000,
          iconTheme: {
            primary: "red",
            secondary: "white",
          },
        },
      }}
    />
  </Provider>,
);
