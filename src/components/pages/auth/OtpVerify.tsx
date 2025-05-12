import BackBtn from "@/components/atoms/Button/BackBtn";
import Button from "@/components/atoms/Button/Button";
import Header from "@/components/atoms/text/Header";
import { useState } from "react";

const OtpVerify = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

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
        console.log(e);
        const prevInput =
          e.currentTarget.parentElement?.previousElementSibling?.querySelector(
            "input",
          );
        prevInput?.focus();
      }
    }
  }

  function handleSubmit() {
    return otp.some((number) => {
      return number === "";
    });
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
              <button className="cursor-pointer pl-2 font-medium text-black">
                Resend Code
              </button>
            </p>
          </div>
          <Button to={handleSubmit() ? "" : "/"} state={handleSubmit()}>
            Send OTP
          </Button>
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
      />
      <div></div>
    </div>
  );
}

export default OtpVerify;
