import { useEffect, useState } from "react";
import BackBtn from "@/components/atoms/button/BackButton";
import Button from "@/components/atoms/button/Button";
import Header from "@/components/atoms/text/Header";
import InputWCountry from "@/components/molecules/login/InputWCountry";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { loginWithNumber } from "@/api/auth";
import axios from "axios";

const SignInPhone = () => {
  const [number, setNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (number.length <= 0) {
      setDisable(true);
      return;
    }
    setError("");
    setDisable(false);
  }, [number]);

  async function handleSubmit() {
    if (number.length < 10) {
      setDisable(false);
      setError("Phone number must be at least 10 digits");
      return;
    }

    try {
      setLoading(true);
      const res = await loginWithNumber({
        phoneno: number.toString(),
        country_code: countryCode,
      });
      const otpData = res;

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
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data?.msg);
      }else{
        toast.error(error.message ?? "Something went wrong");
      }
      setLoading(false);
    }
  }

  return (
    <section className="custom-scroll flex min-h-dvh flex-col gap-4 px-5 py-7">
      <div className="flex items-start gap-4">
        <BackBtn size={38} />
        <div>
          <Header
            heading="Signin with Phone"
            subHeading="welcome back, you have been missed"
          />
        </div>
      </div>
      <div className="flex min-h-[50%] grow flex-col items-center justify-center">
        <div className="flex w-full max-w-75 flex-col gap-8">
          <InputWCountry
            label="Phone Number"
            selectValue={countryCode}
            onSelectCode={setCountryCode}
            value={number}
            onChange={setNumber}
            error={error}
            onKeyUp={(e) => e.key === "Enter" && handleSubmit()}
          />
          {loading ? (
            <p className="text-center font-medium">
              <span className="loader w-2xl"></span>
            </p>
          ) : (
            <Button
              eventHandler={handleSubmit}
              state={number.length <= 0 || disable}
            >
              Send OTP
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SignInPhone;
