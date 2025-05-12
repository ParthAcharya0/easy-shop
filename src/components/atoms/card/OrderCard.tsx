import { IMAGES } from "@/app/images/images";
import { RiDiscountPercentFill } from "react-icons/ri";
import { Link } from "react-router";

interface OrderCardPops {
  type?: "normalOrder" | "returnOrder";
}

const OrderCard = ({ type = "normalOrder" }: OrderCardPops) => {
  return (
    <Link to="/orderDetails">
      <div className="border-b border-gray-200 py-2.5">
        <div className="flex justify-between gap-2">
          <div className="h-24 w-24">
            <img
              className="aspect-square w-full rounded-xl object-contain object-center"
              src={IMAGES.LoginBanner}
              alt=""
            />
          </div>
          <div className="grow">
            <h4 className="heading3">Lorem ipsum dolor</h4>
            <div className="flex flex-col text-sm text-gray-400 capitalize">
              <span>white</span>
              <span>XL</span>
              <span className="inline-flex items-center gap-1">
                <span>qty: 2</span>
                {type === "normalOrder" && (
                  <span className="inline-flex items-center gap-1 text-pink-500">
                    <RiDiscountPercentFill />
                    60% <span className="font-medium">off</span>
                  </span>
                )}
              </span>
            </div>
          </div>
          <div>
            <button className="rounded-full bg-pink-600 px-3 py-1.5 text-sm text-white">
              $10.00
            </button>
          </div>
        </div>

        {type === "normalOrder" ? (
          <div className="inline-flex flex-col gap-1 pt-3 text-sm text-gray-400 capitalize">
            <span>
              Payment ID: <span className="text-black">#51515155</span>
            </span>
            <span>
              order ID:{" "}
              <span className="text-black uppercase">dvvsdv515151vsd55</span>
            </span>
          </div>
        ) : (
          <div className="tetx-sm text-orange-400 capitalize">
            🔸return request approved
          </div>
        )}
      </div>
    </Link>
  );
};

export default OrderCard;
