import { Provider } from "react-redux";
import AppRoutes from "./route/AppRoutes";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import store from "./redux/store";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ScrollToTop from "./components/atoms/ScrollToTop";

const stripePromise = loadStripe(
  "pk_test_51SyXdrBjJmH3ddZe06D4CkABXcW7sD49DXTcFjcEbHXzjcPMKU5bsgnDKoWJSeElLxxlv2XH8JCrLCuXtJ3d2sXS00CKD4Gk84",
);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <Elements stripe={stripePromise}>
          <AppRoutes />
        </Elements>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
