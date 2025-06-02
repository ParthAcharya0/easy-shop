import { AUTH_URL } from "@/app/url";
import BackBtn from "@/components/atoms/Button/BackBtn";
import Button from "@/components/atoms/Button/Button";
import Header from "@/components/atoms/text/Header";
import { setAccessToken } from "@/redux/actions/authAction";
import { useAppDispatch } from "@/redux/hooks";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";

const OtpVerify = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoding] = useState(false);
  const isOtpComplete = otp.some((digit) => digit === "");

  const loginNumber = useRef(null);
  const firstName = useRef(null);
  const lastName = useRef(null);
  const email = useRef(null);
  const phoneNumber = useRef(null);
  const password = useRef(null);
  const otpID = useRef(null);
  let handleSubmit: () => void = () => {};

  const location = useLocation();
  const prevData = location.state;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // console.log(location);

  // checked Coming from Where
  if (prevData?.from === "login") {
    console.log("from login");
    loginNumber.current = prevData?.phoneNumber;
    otpID.current = prevData?.otpID ?? "";
    handleSubmit = handleLoginSubmit;
  } else if (prevData?.from === "register") {
    console.log("from register");
    firstName.current = prevData?.firstName ?? "";
    lastName.current = prevData?.lastName ?? "";
    email.current = prevData?.email ?? "";
    phoneNumber.current = prevData?.phoneNumber ?? "";
    password.current = prevData?.password ?? "";
    otpID.current = prevData?.otpID ?? "";
    handleSubmit = handleRegisterSubmit;
  } else {
    handleSubmit = loginNumber.current
      ? handleLoginSubmit
      : handleRegisterSubmit;
  }

  //Otp Field Func
  function handleInput(e: React.ChangeEvent<HTMLInputElement>, i: number) {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return; // Allow only digits

    setOtp((prev) => {
      if (prev[i] === "") {
        const newotp = [...prev];
        newotp[i] = e.target.value;
        return newotp;
      }
      return prev;
    });

    if (value && e.target.nextSibling instanceof HTMLElement) {
      const nextInput =
        e.target.parentElement?.nextElementSibling?.querySelector("input");
      nextInput?.focus();
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>, i: number) {
    if (e.key === "Backspace") {
      setOtp((prev) => {
        const newotp = [...prev];
        newotp[i] = "";
        return newotp;
      });

      if (i > 0) {
        // console.log(e);
        const prevInput =
          e.currentTarget.parentElement?.previousElementSibling?.querySelector(
            "input",
          );
        prevInput?.focus();
      }
    }
  }

  //resend otp func
  async function resendOtp() {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        otpid: otpID.current,
      }),
    };

    try {
      const res = await fetch(AUTH_URL.resendOtp, options);
      const otpResend = await res.json();
      console.log("res", res);
      console.log("data", otpResend);

      if (otpResend.statusCode === "404") throw new Error("Invaild OTP");

      if (otpResend.status !== "success") throw new Error(otpResend.msg);

      toast.success("OTP Re-send to Given Phone Number");
    } catch (error: any) {
      toast.error(error.message);
      if (error.message === "400") navigate("/login");
      setLoding(false);
    }
  }

  //Submit Events
  async function handleRegisterSubmit() {
    setLoding(true);
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        password: password.current,
        // firstname: firstName.current,
        // lastname: lastName.current,
        country_code: "+91",
        phoneno: phoneNumber.current,
        // email: email.current,
        otpid: otpID.current,
        enteredotp: otp.join(""),
      }),
    };

    try {
      const res = await fetch(AUTH_URL.register, options);
      const resigterData = await res.json();
      console.log("res", res);
      console.log("data", resigterData);

      if (resigterData.statusCode === "404") throw new Error("Invaild OTP");

      if (resigterData.status !== "success") throw new Error(resigterData.msg);

      toast.success("registerd successfully");

      const tokens = resigterData.data.JWTToken;

      localStorage.setItem("AUTH_TOKEN", JSON.stringify({ ...tokens }));

      dispatch(setAccessToken(tokens.accessToken));
      setLoding(false);
      navigate("/");
    } catch (error: any) {
      // 'Failed to fetch'
      toast.error(error.message);
      console.log(error, error.message);
      // if (error.message === "400") navigate("/login");
      setLoding(false);
      // navigate(-1);
    }
  }

  async function handleLoginSubmit() {
    setLoding(true);

    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        phoneno: loginNumber.current,
        country_code: "+91",
        otpid: otpID.current,
        enteredotp: otp.join(""),
      }),
    };

    try {
      const res = await fetch(AUTH_URL.login, options);
      const resigterData = await res.json();
      console.log("res", res);
      console.log("data", resigterData);

      if (resigterData.statusCode === "404") throw new Error("Invaild OTP");

      if (resigterData.status !== "success") throw new Error(resigterData.msg);

      toast.success("Login successfully");

      const tokens = resigterData.data.JWTToken;

      localStorage.setItem("AUTH_TOKEN", JSON.stringify({ ...tokens }));

      dispatch(setAccessToken(tokens.accessToken));
      setLoding(false);
      navigate("/");
    } catch (error: any) {
      // 'Failed to fetch'
      toast.error(error.message);
      console.log(error, error.message);
      // if (error.message === "400") navigate("/login");
      setLoding(false);
      // navigate(-1);
    }
  }

  return (
    <section className="custom-scroll no-scrollbar h-full px-5 py-7">
      <BackBtn size={38} />
      <Header
        heading="Verification Code"
        subHeading="Please enter code sent to e-mail"
      />
      <div className="flex min-h-[60%] flex-col items-center justify-center">
        <div className="flex w-full max-w-[300px] flex-col gap-8">
          <div className="pb-10 text-center">
            <div className="otp-input">
              {otp.map((input, index) => {
                return (
                  <OtpInput
                    value={input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleInput(e, index);
                    }}
                    onKey={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      handleKey(e, index);
                    }}
                    key={index}
                  />
                );
              })}
            </div>
            <p className="sub-heading">
              have Problem?
              <button
                className="cursor-pointer pl-2 font-medium text-black"
                onClick={resendOtp}
              >
                Resend Code
              </button>
            </p>
          </div>
          {!loading ? (
            <Button to="" state={isOtpComplete} eventHandler={handleSubmit}>
              Send OTP
            </Button>
          ) : (
            <p className="text-center font-medium">
              <span className="loader w-2xl"></span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

type OtpInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKey: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

function OtpInput({ value, onChange, onKey }: OtpInputProps) {
  return (
    <div className="otp relative z-0 inline-flex">
      <input
        type="Number"
        className="w-10 rounded-full p-1.5 text-[40px] focus-within:outline-0"
        maxLength={1}
        value={value}
        onChange={onChange}
        onKeyDown={onKey}
        placeholder=""
        inputMode="numeric"
      />
      <div></div>
    </div>
  );
}

export default OtpVerify;
