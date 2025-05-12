import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import NotFound from "./components/pages/NotFound.tsx";
import Login from "./components/pages/auth/Login.tsx";
import SignUpPhone from "./components/pages/auth/SignUpPhone.tsx";
import OtpVerify from "./components/pages/auth/OtpVerify.tsx";
import FavoriteProduct from "./components/pages/Home/FavoriteProduct.tsx";
import AllPopularProduct from "./components/pages/Home/AllPopularProduct.tsx";
import Filter from "./components/pages/Home/Filter.tsx";
import CategoryFilter from "./components/pages/Home/CategoryFilter.tsx";
import Order from "./components/pages/Order/Order.tsx";
import Cart from "./components/pages/Cart.tsx";
import OrderDetail from "./components/pages/OrderDetail.tsx";
import App from "./App.tsx";
import Demo from "./demo.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/demo" element={<Demo />} />
        <Route path="/" element={<App />} />
        <Route path="/signInPhone" element={<SignUpPhone />} />
        <Route path="/otpVerify" element={<OtpVerify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favProduct" element={<FavoriteProduct />} />
        <Route path="/AllPopularProduct" element={<AllPopularProduct />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/categoryFilter" element={<CategoryFilter />} />
        <Route path="/order" element={<Order />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orderDetails" element={<OrderDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
