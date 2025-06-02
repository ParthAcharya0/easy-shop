import { FaStar } from "react-icons/fa";
import LikeBtn from "../Button/LikeBtn";
import { AiOutlineShopping } from "react-icons/ai";
import { RiDiscountPercentFill } from "react-icons/ri";
import { addCartItem } from "@/redux/actions/cartAction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import toast from "react-hot-toast";

export type Product = {
  category_id: number;
  subcategory_id: number;
  id: number;
  title: string;
  image: string;
  label: string;
  actual_price: string;
  selling_price: string;
  discount_label: string;
  isFav: boolean;
};

const ProductCard = ({ details }: { details: Product }) => {
  const cartdata = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  function addCart() {
    const inCart = cartdata.some(
      (item) =>
        item.category_id === details.category_id &&
        item.subcategory_id === details.subcategory_id &&
        item.id === details.id,
    );
    if (inCart) {
      toast.error("already exist in cart");
      return;
    }
    dispatch(addCartItem(details));
    toast.success("successfully added to cart");
  }

  return (
    <div className="relative z-0 flex h-56 w-full flex-col justify-between rounded-md p-2.5 text-white">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1 rounded-md bg-[rgba(50,48,48,0.44)] px-2 py-1 backdrop-blur-sm">
          <FaStar />
          <span>3.9</span>
        </div>
        <LikeBtn
          state={{
            catID: details.category_id,
            subCID: details.subcategory_id,
            productID: details.id,
            fav: details.isFav,
          }}
        />
      </div>
      <div className="rounded-md bg-[rgba(50,48,48,0.44)] px-3 py-2.5 text-base backdrop-blur-xs">
        <h4 className="truncate pb-1.5 font-medium capitalize">
          {details.title}
        </h4>
        <div className="flex items-center justify-between gap-2 text-xs font-light">
          <div className="flex flex-col gap-1">
            <span>${details.selling_price}</span>
            <span className="inline-flex items-center gap-1">
              <RiDiscountPercentFill />
              10% <span className="font-medium">off</span>
            </span>
          </div>
          <button
            className="cursor-pointer rounded-md bg-[rgba(255,255,255,0.12)] p-2 text-base backdrop-blur-sm"
            onClick={addCart}
          >
            <AiOutlineShopping />
          </button>
        </div>
      </div>
      <div className="img-holder absolute inset-0 z-[-1] w-full overflow-hidden rounded-md">
        <img
          className="aspect-square h-full w-full object-contain object-center"
          src={details.image}
          alt=""
        />
      </div>
    </div>
  );
};

export default ProductCard;

// const oldProductCard = () => {
//   return (
//     <div className="relative z-0 flex h-56 w-full flex-col justify-between rounded-md bg-red-600 p-2.5 text-white">
//       <div className="flex items-center justify-between text-sm">
//         <div className="flex items-center gap-1 rounded-md bg-[rgba(255,255,255,0.30)] px-2 py-1 backdrop-blur-sm">
//           <FaStar />
//           <span>3.9</span>
//         </div>
//         <LikeBtn />
//       </div>
//       <div className="rounded-md bg-[rgba(255,255,255,0.18)] px-3 py-2.5 text-base backdrop-blur-xs">
//         <h4 className="pb-1.5 font-medium capitalize">red Nike</h4>
//         <div className="flex items-center justify-between gap-2 text-xs font-light">
//           <div className="flex flex-col gap-1">
//             <span>$17.00</span>
//             <span className="inline-flex items-center gap-1">
//               <RiDiscountPercentFill />
//               10% <span className="font-medium">off</span>
//             </span>
//           </div>
//           <div className="rounded-md bg-[rgba(255,255,255,0.12)] p-2 text-base backdrop-blur-sm">
//             <AiOutlineShopping />
//           </div>
//         </div>
//       </div>
//       <div className="img-holder absolute inset-0 z-[-1] w-full overflow-hidden rounded-md">
//         <img
//           className="aspect-square h-full w-full object-cover object-center"
//           src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//           alt=""
//         />
//       </div>
//     </div>
//   );
// };
