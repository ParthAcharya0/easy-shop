import App from "@/App";
import Login from "@/components/pages/auth/Login";
import SignInPhone from "@/components/pages/auth/SignInPhone";
import SignUp from "@/components/pages/auth/SignUp";
import OtpVerify from "@/components/pages/auth/OtpVerify";
import Cart from "@/components/pages/Cart";
import AllPopularProduct from "@/components/pages/Home/AllPopularProduct";
import CategoryFilter from "@/components/pages/Home/CategoryFilter";
import FavoriteProduct from "@/components/pages/Home/FavoriteProduct";
import Filter from "@/components/pages/Home/Filter";
import NotFound from "@/components/pages/NotFound";
import Order from "@/components/pages/Order/Order";
import OrderDetail from "@/components/pages/OrderDetail";
import Demo from "@/Demo";
import { JSX, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import { useAppSelector } from "@/redux/hooks";
import CategoryProduct from "@/components/pages/CategoryProduct";

const Router = () => {
  const navigate = useNavigate();
  const isUserAuth = useAppSelector((state) => state.auth.isUserAuth);

  useEffect(() => {
    if (!isUserAuth) {
      navigate("/login");
      // console.log("home", isUserAuth);
    }
  }, []);

  return (
    <Routes>
      <Route path="/demo" element={<Demo />} />

      <Route
        path="/login"
        element={
          <ProtcedRoute>
            <Login />
          </ProtcedRoute>
        }
      />
      <Route
        path="/signInPhone"
        element={
          <ProtcedRoute>
            <SignInPhone />
          </ProtcedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <ProtcedRoute>
            <SignUp />
          </ProtcedRoute>
        }
      />
      <Route
        path="/otpVerify"
        element={
          <ProtcedRoute>
            <OtpVerify />
          </ProtcedRoute>
        }
      />
      <Route path="/" element={<App />} />
      <Route path="/order" element={<Order />} />
      <Route path="/favProduct" element={<FavoriteProduct />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/filter" element={<Filter />} />
      <Route path="/categoryFilter" element={<CategoryFilter />} />
      <Route path="/category/:categoryID" element={<CategoryProduct />} />
      <Route path="/AllPopularProduct" element={<AllPopularProduct />} />
      <Route path="/orderDetails" element={<OrderDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const ProtcedRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const isUserAuth = useAppSelector((state) => state.auth.isUserAuth);

  useEffect(() => {
    if (isUserAuth) {
      navigate("/");
    }
    // console.log("object", isUserAuth);
  }, []);

  return <>{children}</>;
};

export default Router;
