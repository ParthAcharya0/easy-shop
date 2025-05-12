import BackBtn from "@/components/atoms/Button/BackBtn";
import Button from "@/components/atoms/Button/Button";
import Header from "@/components/atoms/text/Header";
import InputWCountry from "@/components/molecules/Login/InputWCountry";

const SignUpPhone = () => {
  return (
    <section className="custom-scroll no-scrollbar h-full px-5 py-7">
      <BackBtn size={38} />
      <Header
        heading="Signin with Phone"
        subHeading="welcome back, you have been missed"
      />
      <div className="flex min-h-[50%] flex-col items-center justify-center">
        <div className="flex w-full max-w-[300px] flex-col gap-8">
          <InputWCountry label="Phone Number" />
          <Button to="/otpVerify">Send OTP</Button>
        </div>
      </div>
    </section>
  );
};

export default SignUpPhone;
