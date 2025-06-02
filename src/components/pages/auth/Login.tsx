import { IMAGES } from "@/app/images/images";
import Button from "@/components/atoms/Button/Button";
import Header from "@/components/atoms/text/Header";
import { useEffect } from "react";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("AUTH_TOKEN")) {
      navigate("/");
    }
  }, []);

  return (
    <section className="custom-scroll no-scrollbar flex h-full flex-col justify-between gap-6 px-5">
      <div className="pt-8">
        <Header
          heading="Let's you signin"
          subHeading="welcome back, you have been missed"
        />
      </div>
      <div className="px-1 py-6">
        <img
          loading="lazy"
          className="mx-auto w-full max-w-[450px] object-cover object-center"
          src={IMAGES.LoginBanner}
          alt=""
        />
      </div>
      <div className="px-[12%]">
        <Button to="/signInPhone">Login with Phone Number</Button>
      </div>
      <div className="relative z-0 mx-[12%] flex justify-center uppercase">
        <div className="absolute inset-0 z-[-1] my-auto h-[2px] bg-gradient-to-r from-white via-gray-400 to-white"></div>
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
      </div>
      <div className="pb-10 text-center">
        <p className="sub-heading">
          Don't have an account?
          <Link to="/signup">
            <span className="pl-2 font-medium text-black">Create one</span>
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
