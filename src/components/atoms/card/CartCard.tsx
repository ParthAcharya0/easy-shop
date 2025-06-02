import { removeCartItem, setQuantity } from "@/redux/actions/cartAction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import toast from "react-hot-toast";
import { RiDeleteBin5Line } from "react-icons/ri";

export type Cart = {
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
  quantity: number;
};

const CartCard = ({ data }: { data: Cart }) => {
  const cartItmes = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  function removeItem() {
    dispatch(removeCartItem(data, cartItmes));
    toast.success("Items Removed Successfully.");
  }

  console.log("cartItmes", data);
  return (
    <div className="relative z-0 flex w-full items-center justify-between gap-2 border-b border-gray-300 px-3 py-3 text-black">
      <button
        className="absolute top-1 right-3 z-10 ml-auto h-fit cursor-pointer"
        onClick={removeItem}
      >
        <RiDeleteBin5Line size={24} color="oklch(0.551 0.027 264.364)" />
      </button>
      <div className="img-holder aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-lg">
        <img
          className="aspect-square h-full w-full object-cover object-center"
          src={data.image}
          alt=""
        />
      </div>
      <div className="flex grow flex-col justify-between rounded-md bg-[rgba(255,255,255,0.22)] text-base backdrop-blur-sm">
        <h4 className="py-0 font-medium capitalize">{data.title}</h4>
        <div className="flex flex-col justify-between gap-3 text-base text-gray-500">
          <span>{data.label}</span>
          <span>${data.selling_price}</span>
        </div>
      </div>
      <div className="flex h-full shrink-0 items-center justify-center gap-3 self-end">
        <button
          className="cursor-pointer rounded-lg bg-gray-200 px-2.5 py-1 text-xl font-medium text-black"
          onClick={() => {
            if (data.quantity <= 1) {
              toast.error(
                "At least 1 quantity is required. To delete the category, please click the delete button",
              );
              // removeItem()
              return;
            }
            dispatch(setQuantity(cartItmes, data, -1));
          }}
        >
          -
        </button>
        <span className="font-semibold">{data.quantity}</span>
        <button
          className="cursor-pointer rounded-lg bg-pink-500 px-2.5 py-1 text-xl font-medium text-white"
          onClick={() => dispatch(setQuantity(cartItmes, data, 1))}
        >
          +
        </button>
      </div>
    </div>
  );
};

// const CartCard = () => {
//   const [count, setCount] = useState(0);
//   return (
//     <div className="relative z-0 flex w-full items-center justify-between gap-2 border-b border-gray-300 px-3 py-3 text-black">
//       <div className="absolute top-1 right-3 z-10 ml-auto h-fit">
//         <RiDeleteBin5Line size={24} color="oklch(0.551 0.027 264.364)" />
//       </div>
//       <div className="img-holder aspect-square h-20 w-20 overflow-hidden rounded-lg">
//         <img
//           className="aspect-square h-full w-full object-cover object-center"
//           src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
//           alt=""
//         />
//       </div>
//       <div className="flex grow flex-col justify-between rounded-md bg-[rgba(255,255,255,0.22)] text-base backdrop-blur-sm">
//         <h4 className="py-0 font-medium capitalize">red Nike</h4>
//         <div className="flex flex-col justify-between gap-3 text-base text-gray-500">
//           <span>white</span>
//           <span>$10.00</span>
//         </div>
//       </div>
//       <div className="flex h-full items-center justify-center gap-3 self-end">
//         <button
//           className="cursor-pointer rounded-lg bg-gray-200 px-2.5 py-1 text-xl font-medium text-black"
//           onClick={() => setCount((prev) => (prev > 0 ? prev - 1 : prev))}
//         >
//           -
//         </button>
//         <span className="font-semibold">{count}</span>
//         <button
//           className="cursor-pointer rounded-lg bg-pink-500 px-2.5 py-1 text-xl font-medium text-white"
//           onClick={() => setCount((prev) => prev + 1)}
//         >
//           +
//         </button>
//       </div>
//     </div>
//   );
// };

export default CartCard;
