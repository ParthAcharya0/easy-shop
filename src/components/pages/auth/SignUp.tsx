import { AUTH_URL } from "@/app/url";
import BackBtn from "@/components/atoms/button/BackButton";
import Button from "@/components/atoms/button/Button";
import InputLable from "@/components/atoms/input/InputLable";
import Header from "@/components/atoms/text/Header";
import InputWCountry from "@/components/molecules/login/InputWCountry";
import { useEffect, useReducer, useState } from "react";
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

type Action =
  | {
      type: "setField";
      payload: { key: keyof Omit<State, "error">; value: string | boolean };
    }
  | { type: "setError"; payload: Record<string, string> }
  | { type: "reset"; payload: keyof State["error"] };

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  checked: false,
  error: {},
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "setField":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case "setError":
      return { ...state, error: { ...action.payload } };
    case "reset":
      return { ...state, error: { ...state.error, [action.payload]: "" } };

    default:
      return state;
  }
}

const SignUp = () => {
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState("+91");
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { firstName, lastName, email, phoneNumber, password, checked, error } =
    state;
  const [btnState, setBtnState] = useState(true);

  //check validation
  useEffect(() => {
    if (firstName && lastName && email && phoneNumber && password && checked) {
      setBtnState(false);
    } else {
      setBtnState(true);
    }
  }, [firstName, lastName, email, phoneNumber, password, checked]);

  // Validate func
  function isValidation() {
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

    //Set in Local Reducer
    dispatch({ type: "setError", payload: newErrors });

    return Object.keys(newErrors).length === 0 ? true : false;
  }

  // Submit with Send OTP
  async function handleSubmit() {
    if (!isValidation()) return;
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        phoneno: phoneNumber.toString(),
        country_code: countryCode,
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
    }
  }

  return (
    <section className="custom-scroll no-scrollbar flex h-full flex-col gap-2 px-5 py-3">
      <div className="-ml-1.5 h-[44px]">
        <BackBtn size={44} to={"/login"} />
      </div>
      <div>
        <Header
          heading="welcome to easyshop"
          subHeading="and enjoy life during time you"
        />
      </div>
      <div className="max-[427px]:max-w-full mx-auto flex max-w-[85%] grow flex-col justify-around gap-3">
        <InputLable
          value={firstName}
          handleChange={dispatch}
          payloadKey={"firstName"}
          label="first name"
          placeholder="Enter first name"
          error={error.firstName}
        />
        <InputLable
          value={lastName}
          handleChange={dispatch}
          payloadKey="lastName"
          label="last name"
          placeholder="Enter last name"
          error={error.lastName}
        />
        <InputLable
          value={email}
          handleChange={dispatch}
          payloadKey="email"
          label="email"
          placeholder="Enter e-mail address"
          type="email"
          error={error.email}
        />
        <InputWCountry
          label="Phone Number"
          selectValue={countryCode}
          onSelect={setCountryCode}
          value={phoneNumber}
          onChange={dispatch}
          payloadKey="phoneNumber"
          actionType="setField"
          error={error.phoneNumber}
        />
        <InputLable
          value={password}
          handleChange={dispatch}
          payloadKey="password"
          label="password"
          placeholder="Enter Password"
          type="password"
          error={error.password}
        />
        <div>
          <label
            className="flex items-center gap-3 accent-pink-500"
            htmlFor="terms"
          >
            <input
              className="ml-2 scale-150"
              type="checkbox"
              id="terms"
              value={checked.toString()}
              checked={checked}
              onClick={() =>
                dispatch({
                  type: "setField",
                  payload: { key: "checked", value: !state.checked },
                })
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
