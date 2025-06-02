import { useEffect, useState } from "react";
import BackBtn from "@/components/atoms/Button/BackBtn";
import Button from "@/components/atoms/Button/Button";
import Header from "@/components/atoms/text/Header";
import InputWCountry from "@/components/molecules/Login/InputWCountry";
import { useNavigate } from "react-router";
import { AUTH_URL } from "@/app/url";
import toast from "react-hot-toast";

const SignInPhone = () => {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (number.length === 10) {
      setDisable(false);
      setError("");
      return;
    }
    setDisable(true);

    setError("Invalid phone number");
  }, [number]);

  // function handleSubmit() {
  //   if (number.length === 10) {
  //     navigate("/otpVerify", { state: number });
  //     return;
  //   }

  //   alert("Enter Vaild Number");
  // }

  async function handleSubmit() {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        phoneno: number.toString(),
        country_code: "+91",
      }),
    };

    try {
      setLoading(true);
      const res = await fetch(AUTH_URL.sendOtpL, options);
      const otpData = await res.json();

      if (otpData.status !== "success") throw new Error(otpData.msg.toString());
      toast.success(otpData.msg);
      
      navigate("/otpVerify", {
        state: {
          from: "login",
          phoneNumber: number,
          otpID: otpData.data.otpid,
        },
      });
    } catch (error: any) {
      // console.log(error);
      toast.error(error.message);
      setLoading(false);
      // navigate(-1);
    }
  }

  return (
    <section className="custom-scroll no-scrollbar h-full px-5 py-7">
      <BackBtn size={38} />
      <Header
        heading="Signin with Phone"
        subHeading="welcome back, you have been missed"
      />
      <div className="flex min-h-[50%] flex-col items-center justify-center">
        <div className="flex w-full max-w-[300px] flex-col gap-8">
          <InputWCountry
            label="Phone Number"
            value={number}
            onChange={setNumber}
            error={error}
          />
          {loading ? (
            <p className="text-center font-medium">
              <span className="loader w-2xl"></span>
            </p>
          ) : (
            <Button eventHandler={handleSubmit} state={disable}>
              Send OTP
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SignInPhone;
