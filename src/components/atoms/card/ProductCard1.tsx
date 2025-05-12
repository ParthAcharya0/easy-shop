import DustbinBtn from "../Button/DustbinBtn";
import LikeBtn from "../Button/LikeBtn";
import { RiDiscountPercentFill } from "react-icons/ri";

const   ProductCard1 = ({ variant = false }: { variant?: boolean }) => {
  return (
    <div className="flex w-full min-w-44 flex-col justify-between rounded-md text-black">
      <div
        className={`img-holder relative aspect-square ${variant ? "h-48" : "h-40"} w-full overflow-hidden rounded-lg`}
      >
        <img
          className="aspect-square h-full w-full object-cover object-center"
          src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div className="absolute top-3 right-2 ml-auto h-fit">
          {variant ? <DustbinBtn /> : <LikeBtn />}
        </div>
      </div>
      <div className="rounded-md bg-[rgba(255,255,255,0.22)] px-3 py-2.5 text-base backdrop-blur-sm">
        <h4 className="py-0 font-medium capitalize">red Nike</h4>
        <div className="flex flex-col gap-0.5">
          <span>$48</span>
          {!variant && (
            <span className="inline-flex items-center gap-1 text-amber-700">
              <RiDiscountPercentFill />
              10% <span className="font-medium">off</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard1;
