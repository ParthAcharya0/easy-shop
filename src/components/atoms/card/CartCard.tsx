import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

const CartCard = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="relative z-0 flex w-full items-center justify-between gap-2 border-b border-gray-300 px-3 py-3 text-black">
      <div className="absolute top-1 right-3 z-10 ml-auto h-fit">
        <RiDeleteBin5Line size={24} color="oklch(0.551 0.027 264.364)" />
      </div>
      <div className="img-holder aspect-square h-20 w-20 overflow-hidden rounded-lg">
        <img
          className="aspect-square h-full w-full object-cover object-center"
          src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
          alt=""
        />
      </div>
      <div className="flex grow flex-col justify-between rounded-md bg-[rgba(255,255,255,0.22)] text-base backdrop-blur-sm">
        <h4 className="py-0 font-medium capitalize">red Nike</h4>
        <div className="flex flex-col justify-between gap-3 text-base text-gray-500">
          <span>white</span>
          <span>$10.00</span>
        </div>
      </div>
      <div className="flex h-full items-center justify-center gap-3 self-end">
        <button
          className="cursor-pointer rounded-lg bg-gray-200 px-2.5 py-1 text-xl font-medium text-black"
          onClick={() => setCount((prev) => (prev > 0 ? prev - 1 : prev))}
        >
          -
        </button>
        <span className="font-semibold">{count}</span>
        <button
          className="cursor-pointer rounded-lg bg-pink-500 px-2.5 py-1 text-xl font-medium text-white"
          onClick={() => setCount((prev) => prev + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartCard;
