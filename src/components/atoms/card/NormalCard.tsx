import DeleteButton from "../button/DeleteButton";
import LikeBtn from "../button/LikeButton";
import { RiDiscountPercentFill } from "react-icons/ri";
import { Product } from "./ProductCard";
import { AiOutlineShopping } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addCartItem } from "@/redux/actions/cartAction";
import { toast } from "react-toastify";

const NormalCard = ({
  variant = false,
  data,
  from,
}: {
  variant?: boolean;
  data: Product;
  from?: string;
}) => {
  const cartdata = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  function addCart() {
    const inCart = cartdata.some(
      (item) =>
        item.category_id === data.category_id &&
        item.subcategory_id === data.subcategory_id &&
        item.id === data.id,
    );
    if (inCart) {
      toast.error("already exist in cart");
      return;
    }
    dispatch(addCartItem(data));
    toast.success("successfully added to cart");
  }
  return (
    <div className="flex w-full min-w-48 flex-col justify-between rounded-md text-black select-none">
      <div
        className={`img-holder relative aspect-square ${variant ? "h-48" : "h-40"} w-full overflow-hidden rounded-lg`}
      >
        <img
          className="aspect-square h-full w-full object-contain object-center"
          src={data.image}
          alt=""
        />
        {!from && (
          <div className="absolute top-3 right-2 ml-auto h-fit">
            {variant ? (
              <DeleteButton />
            ) : (
              <LikeBtn
                state={{
                  catID: data.category_id,
                  subCID: data.subcategory_id,
                  productID: data.id,
                  fav: data.isFav,
                }}
              />
            )}
          </div>
        )}
      </div>
      <div className="rounded-md bg-[rgba(255,255,255,0.22)] px-3 py-2.5 text-base backdrop-blur-sm">
        <h4
          className="line-clamp-2 max-w-[86%] py-0 font-medium capitalize"
          title={data.title}
        >
          {data.title}
        </h4>
        <div className="flex flex-col gap-0.5">
          <span>
            <span>${data.selling_price}</span>{" "}
            <span className="font-light line-through">
              ${data.actual_price}
            </span>{" "}
            {!(
              (parseInt(data.actual_price) - parseInt(data.selling_price)) /
              parseInt(data.actual_price)
            ) &&
              !!(
                (parseInt(data.actual_price) - parseInt(data.selling_price)) /
                parseInt(data.actual_price)
              ) && (
                <span className="inline-flex items-center gap-1 text-amber-700">
                  <RiDiscountPercentFill />
                  {(parseInt(data.actual_price) -
                    parseInt(data.selling_price)) /
                    parseInt(data.actual_price)}{" "}
                  <span className="font-medium">off</span>
                </span>
              )}
          </span>
          {!variant && (
            <div className="flex flex-col justify-between">
              <button
                className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-black p-2 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-80"
                onClick={addCart}
              >
                Add to cart{" "}
                <AiOutlineShopping className="text-xl" color="white" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NormalCard;

// const oldNormalCard = ({
//   variant = false,
//   data,
// }: {
//   variant?: boolean;
//   data: any;
// }) => {
//   console.log(data);
//   return (
//     <div className="flex w-full min-w-44 flex-col justify-between rounded-md text-black">
//       <div
//         className={`img-holder relative aspect-square ${variant ? "h-48" : "h-40"} w-full overflow-hidden rounded-lg`}
//       >
//         <img
//           className="aspect-square h-full w-full object-cover object-center"
//           src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//           alt=""
//         />
//         <div className="absolute top-3 right-2 ml-auto h-fit">
//           {variant ? <DeleteButton /> : <LikeBtn />}
//         </div>
//       </div>
//       <div className="rounded-md bg-[rgba(255,255,255,0.22)] px-3 py-2.5 text-base backdrop-blur-sm">
//         <h4 className="py-0 font-medium capitalize">red Nike</h4>
//         <div className="flex flex-col gap-0.5">
//           <span>$48</span>
//           {!variant && (
//             <span className="inline-flex items-center gap-1 text-amber-700">
//               <RiDiscountPercentFill />
//               10% <span className="font-medium">off</span>
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
