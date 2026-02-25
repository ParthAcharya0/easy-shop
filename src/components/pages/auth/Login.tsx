import { IMAGES } from "@/constant/images/images";
import Button from "@/components/atoms/button/Button";
import Header from "@/components/atoms/text/Header";
import { Link } from "react-router";

const Login = () => {

  return (
    <section className="custom-scroll container mx-auto flex h-dvh flex-col md:flex-row-reverse md:gap-5 md:px-5 relative z-0">
      <div className="flex absolute md:relative -z-1 inset-0 grow basis-full items-center md:h-full">
        <img
          loading="lazy"
          className="mx-auto h-full w-full object-cover object-center"
          src={IMAGES.LoginBanner}
          alt="login-banner"
        />
      </div>
      <div className="h-full grow basis-full flex flex-col justify-end  md:justify-center">
        <div className="bg-white pb-10 p-5 rounded-t-3xl">
          <img className="hidden w-20 py-4 md:block" src="./logo.png" alt="" />
          <div className="flex w-full flex-1 flex-col gap-6">
            <Header
              heading="Let's you sign in"
              subHeading="Welcome back, we've missed you."
            />
            <div className="mx-auto w-full px-5">
              <Button to="/signInPhone">Login with Phone Number</Button>
            </div>
            {/* <div className="relative z-0 mx-[12%] flex justify-center uppercase">
              <div className="absolute inset-0 z-[-1] my-auto h-0.5 bg-linear-to-r from-white via-gray-400 to-white"></div>
              <span className="sub-heading z-10 inline-block bg-white px-3 font-medium">
                or Login With
              </span>
            </div>
            <div className="flex items-center justify-center gap-10">
              <div className="rounded-2xl border border-gray-300 p-3">
                <FaFacebook size={34} color="blue" />
              </div>
              <div className="rounded-2xl border border-gray-300 p-3">
                <FcGoogle size={34} />
              </div>
              <div className="rounded-2xl border border-gray-300 p-3">
                <FaApple size={34} />
              </div>
            </div> */}
            <div className="pb-10 text-center">
              <p className="sub-heading">
                Don't have an account?
                <Link to="/signup">
                  <span className="pl-2 font-medium text-black">
                    Create one
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
