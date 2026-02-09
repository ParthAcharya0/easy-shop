import Login from "@/components/pages/auth/Login";
import SignInPhone from "@/components/pages/auth/SignInPhone";
import SignUp from "@/components/pages/auth/SignUp";
import OtpVerify from "@/components/pages/auth/OtpVerify";
import Cart from "@/components/pages/Cart";
import AllPopularProduct from "@/components/pages/home/AllPopularProduct";
import CategoryFilter from "@/components/pages/home/CategoryFilter";
import FavoriteProduct from "@/components/pages/home/FavoriteProduct";
import Filter from "@/components/pages/home/Filter";
import NotFound from "@/components/pages/NotFound";
import Order from "@/components/pages/order/Order";
import OrderDetail from "@/components/pages/order/OrderDetail";
import { Route, Routes } from "react-router";
import CategoryProduct from "@/components/pages/CategoryProduct";
import AllAddress from "@/components/pages/address/AllAddress";
import AddAddress from "@/components/pages/address/AddAddress";
import EditAddress from "@/components/pages/address/EditAddress";
import Home from "@/components/pages/home/Home";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signInPhone" element={<SignInPhone />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/otpVerify" element={<OtpVerify />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/favProduct" element={<FavoriteProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/categoryFilter" element={<CategoryFilter />} />
        <Route
          path="/category/:categoryDetails"
          element={<CategoryProduct />}
        />
        <Route path="/AllPopularProduct" element={<AllPopularProduct />} />
        <Route path="/orderDetails/:orderID" element={<OrderDetail />} />
        <Route path="/address" element={<AllAddress />} />
        <Route path="/add" element={<AddAddress />} />
        <Route path="/edit" element={<EditAddress />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
