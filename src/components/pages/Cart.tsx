import { RiHome4Line } from "react-icons/ri";
import BackBtn from "../atoms/Button/BackBtn";
import { Link } from "react-router";
import Button from "../atoms/Button/Button";
import CartCard from "../atoms/card/CartCard";
import SummaryCard from "../atoms/card/SummaryCard";
import HeaderLink from "../atoms/text/HeaderLink";
import AddressCard from "../atoms/card/AddressCard";
import { useAppSelector } from "@/redux/hooks";

// const cartData = [
//   {
//     category_id: 1,
//     subcategory_id: 1,
//     isFav: false,
//     id: 1,
//     title: "Progresso Traditional, Chicken Noodle Soup",
//     image:
//       "http://res.cloudinary.com/dhtkusrbf/image/upload/v1715580960/instacart/products/qyomidurumcakcw6c1x8.webp",
//     label: "19 kg",
//     actual_price: "4.99",
//     selling_price: "4.99",
//     discount_label: "Buy 1, get 1",
//     quantity: 1,
//   },
//   {
//     category_id: 1,
//     subcategory_id: 1,
//     isFav: false,
//     id: 2,
//     title: "Abreva Docosanol 10% Cold Sore Treatment\n",
//     image:
//       "http://res.cloudinary.com/dhtkusrbf/image/upload/v1715581279/instacart/products/wuwmcf6famer7bmaltx9.jpg",
//     label: "2 × 2 g",
//     actual_price: "45.99",
//     selling_price: "45.99",
//     quantity: 1,
//   },
//   {
//     category_id: 1,
//     subcategory_id: 1,
//     isFav: false,
//     id: 3,
//     title:
//       "Zicam Cold Remedy Cold Shortening Medicated Nasal Swabs Zinc-Free Ct\n",
//     image:
//       "http://res.cloudinary.com/dhtkusrbf/image/upload/v1715581622/instacart/products/ps18xzbbdbp5yh0mfxfi.jpg",
//     label: "20 each",
//     actual_price: "15.79",
//     selling_price: "15.79",
//     quantity: 1,
//   },
// ];
const Cart = () => {
  const cartData = useAppSelector((state) => state.cart);

  if (cartData.length === 0) {
    return (
      <>
        <div className="flex shrink-0 items-center justify-between px-3 py-3">
          <BackBtn size={32} />
          <h2 className="heading2">Cart</h2>
          <Link to="/">
            <RiHome4Line size={30} />
          </Link>
        </div>
        <div className="flex h-[80%] items-center justify-center text-2xl font-semibold">
          <span>No Product Added Yet</span>
        </div>
      </>
    );
  }
  return (
    <div className="flex h-full flex-col rounded-lg">
      <div className="flex shrink-0 items-center justify-between px-3 py-3">
        <BackBtn size={32} />
        <h2 className="heading2">Cart</h2>
        <Link to="/">
          <RiHome4Line size={30} />
        </Link>
      </div>
      <div className="custom-scroll no-scrollbar grow px-3">
        <div>
          <h2 className="heading3">Product Details</h2>
          <div className="flex flex-col gap-2">
            {cartData.map((item, id) => (
              <CartCard key={id} data={item} />
            ))}
          </div>
          <AddressCard />
          <div className="flex flex-col gap-2 py-3">
            <HeaderLink heading="Payment Type" subHeading="Edit" to="/" />
            <span className="heading2">Cash On Delivery</span>
          </div>
          <div className="">
            <SummaryCard data={cartData} />
          </div>
        </div>
      </div>
      <div className="shrink-0 border-t border-gray-400 px-[18%] pt-8 pb-6">
        <Button to="/">Place Order</Button>
      </div>
    </div>
  );
};

export default Cart;

// const oldCart = () => {
//   return (
//     <div className="flex h-full flex-col rounded-lg">
//       <div className="flex shrink-0 items-center justify-between px-3 py-3">
//         <BackBtn size={32} />
//         <h2 className="heading2">Cart</h2>
//         <Link to="/">
//           <RiHome4Line size={30} />
//         </Link>
//       </div>
//       <div className="custom-scroll no-scrollbar grow px-3">
//         <div>
//           <h2 className="heading3">Product Details</h2>
//           <div className="flex flex-col gap-2">
//             <CartCard />
//             <CartCard />
//           </div>
//           <AddressCard />
//           <div className="flex flex-col gap-2 py-3">
//             <HeaderLink heading="Payment Type" subHeading="Edit" to="/" />
//             <span className="heading2">Cash On Delivery</span>
//           </div>
//           <div className="">
//             <SummaryCard />
//           </div>
//         </div>
//       </div>
//       <div className="shrink-0 border-t border-gray-400 px-[18%] pt-8 pb-6">
//         <Button to="/">Place Order</Button>
//       </div>
//     </div>
//   );
// };
