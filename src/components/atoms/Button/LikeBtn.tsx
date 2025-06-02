import { setFavProduct } from "@/redux/actions/storeAction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const LikeBtn = ({
  color = "white",
  state,
}: {
  color?: string;
  state: {
    catID: number;
    subCID: number;
    productID: number;
    fav: boolean;
  };
}) => {
  const allProduct = useAppSelector((state) => state.storeData.allProducts);
  const dispatch = useAppDispatch();

  return (
    <button
      className="cursor-pointer rounded-full bg-[rgba(198,197,197,0.6)] px-2 py-2 backdrop-blur-sm"
      onClick={() =>
        dispatch(
          setFavProduct(
            allProduct,
            state.catID,
            state.subCID,
            state.productID,
            state.fav,
          ),
        )
      }
    >
      {state?.fav ? (
        <FaHeart size={20} color={"red"} />
      ) : (
        <CiHeart size={20} color={color} />
      )}
    </button>
  );
};

export default LikeBtn;
