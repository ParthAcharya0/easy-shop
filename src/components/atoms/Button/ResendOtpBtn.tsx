import { useEffect, useState } from "react";

const ResendOtpBtn = ({ handler }: { handler: ()=> void}) => {
  const [count, setCount] = useState(60);

  useEffect(() => {
    if (count <= 0) return;

    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count]);

  const handleResend = () => {
    if (count === 0) {
      // Resend logic here
      handler();
      setCount(60);
    }
  };

  return (
    <button
      className="cursor-pointer pl-2 font-medium text-black"
      onClick={handleResend}
      disabled={count > 0}
    >
      {count > 0 ? `Resend Code (${count}s)` : "Resend Code"}
    </button>
  );
};

export default ResendOtpBtn;
