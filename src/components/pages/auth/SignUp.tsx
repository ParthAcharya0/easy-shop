import { AUTH_URL } from "@/app/url";
import BackBtn from "@/components/atoms/Button/BackBtn";
import Button from "@/components/atoms/Button/Button";
import InputLable from "@/components/atoms/Input/InputLable";
import Header from "@/components/atoms/text/Header";
import InputWCountry from "@/components/molecules/Login/InputWCountry";
import { useEffect, useReducer, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

type State = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  checked: boolean;
  error: any;
};

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  checked: false,
  error: {},
};

function reducer(state: State, action: any) {
  switch (action.type) {
    case "setFname":
      return { ...state, firstName: action.payload };
    case "setLname":
      return { ...state, lastName: action.payload };
    case "setEmail":
      return { ...state, email: action.payload };
    case "setNumber":
      return { ...state, phoneNumber: action.payload };
    case "setPwd":
      return { ...state, password: action.payload };
    case "setChecked":
      return { ...state, checked: !action.payload };
    case "setError":
      return { ...state, error: { ...action.payload } };

    default:
      return state;
  }
}

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { firstName, lastName, email, phoneNumber, password, checked, error } =
    state;

  let bState = useRef(true);
  let btnState = bState.current;

  //check validation
  useEffect(() => {
    const newErrors: Partial<State["error"]> = {};

    //First Name Validation
    const nameRegex = /^[A-Za-zÀ-ÿ' -]+$/; // supports accented characters, apostrophes, hyphens
    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    } else if (firstName.length > 50) {
      newErrors.firstName = "First name must be less than 50 characters";
    } else if (!nameRegex.test(firstName)) {
      newErrors.firstName = "First name contains invalid characters";
    }

    // Last Name Validation
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    } else if (lastName.length > 50) {
      newErrors.lastName = "Last name must be less than 50 characters";
    } else if (!nameRegex.test(lastName)) {
      newErrors.lastName = "Last name contains invalid characters";
    }

    //E-mail Validation
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email";

    //Phone Validation
    if (!/^\d{10}$/.test(phoneNumber))
      newErrors.phoneNumber = "Invalid phone number";

    //PWD Validation
    if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    //Is Checked ?
    if (!checked) newErrors.checkbox = "mark checkbox";

    bState.current = Object.keys(newErrors).length !== 0;

    //Set in Local Reducer
    dispatch({ type: "setError", payload: newErrors });
  }, [firstName, lastName, email, phoneNumber, password, checked]);

  // Submit with Send OTP
  async function handleSubmit() {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        phoneno: phoneNumber.toString(),
        country_code: "+91",
        // email,
      }),
    };

    try {
      setLoading(true);
      const res = await fetch(AUTH_URL.sendOtpR, options);
      const otpData = await res.json();

      if (otpData.status !== "success") throw new Error(otpData.msg.toString());

      toast.success(otpData.msg);
      navigate("/otpVerify", {
        state: {
          from: "register",
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
          otpID: otpData.data.otpid,
        },
      });
    } catch (error: any) {
      // console.log(error);
      toast.error(error.message);
      setLoading(false);
      if (error.message === "User with given phone number already exists👀")
        navigate("/signInPhone");
      // navigate(-1);
    }
  }

  return (
    <section className="custom-scroll no-scrollbar flex h-full flex-col gap-2 px-5 py-3">
      <div className="-ml-1.5 h-[44px]">
        <BackBtn size={44} to={"/signInPhone"} />
      </div>
      <div>
        <Header
          heading="welcome to easyshop"
          subHeading="and enjoy life during time you"
        />
      </div>
      <div className="[width >= 300px]:max-w-full mx-auto flex max-w-[85%] grow flex-col justify-around gap-3">
        <InputLable
          value={firstName}
          handleChange={dispatch}
          actionType={"setFname"}
          label="first name"
          placeholder="Enter first name"
          error={error.firstName}
        />
        <InputLable
          value={lastName}
          handleChange={dispatch}
          actionType={"setLname"}
          label="last name"
          placeholder="Enter last name"
          error={error.lastName}
        />
        <InputLable
          value={email}
          handleChange={dispatch}
          actionType={"setEmail"}
          label="email"
          placeholder="Enter e-mail address"
          type="email"
          error={error.email}
        />
        <InputWCountry
          label="Phone Number"
          value={phoneNumber}
          onChange={dispatch}
          actionType="setNumber"
          error={error.phoneNumber}
        />
        <InputLable
          value={password}
          handleChange={dispatch}
          actionType={"setPwd"}
          label="password"
          placeholder="Enter Password"
          type="password"
          error={error.password}
        />
        <div>
          <label
            className="flex items-baseline gap-3 accent-pink-500"
            htmlFor="terms"
          >
            <input
              className="ml-2 scale-150"
              type="checkbox"
              id="terms"
              value={checked.toString()}
              onClick={() =>
                dispatch({ type: "setChecked", payload: state.checked })
              }
            />
            <span className="text-gray-400">
              By creating this account, you have to agree with
              <span className="font-medium text-black">Term of Services.</span>
            </span>
          </label>
        </div>
        {loading ? (
          <p className="text-center font-medium">
            <span className="loader w-2xl"></span>
          </p>
        ) : (
          <Button state={btnState} eventHandler={handleSubmit}>
            Continue
          </Button>
        )}
        <div className="self-center text-gray-400">
          Already have an account ?
          <Link to="/signInPhone">
            <span className="ml-2 font-semibold text-black">Login</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
