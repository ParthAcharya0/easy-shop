import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const LikeBtn = ({ color = "white" }) => {
  const [like, setLike] = useState(false);

  return (
    <button
      className="cursor-pointer rounded-full bg-[rgba(255,255,255,0.30)] px-2 py-2 backdrop-blur-sm"
      onClick={() => setLike(!like)}
    >
      {like ? (
        <FaHeart size={20} color={color} />
      ) : (
        <CiHeart size={20} color={color} />
      )}
    </button>
  );
};

export default LikeBtn;
