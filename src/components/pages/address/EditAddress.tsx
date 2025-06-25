import editAddress from "@/api/editAddress";
import BackBtn from "@/components/atoms/Button/BackBtn";
import Button from "@/components/atoms/Button/Button";
import InputLable from "@/components/atoms/Input/InputLable";
import Select from "@/components/atoms/Input/Select";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { GetCity, GetCountries, GetState } from "react-country-state-city";
import { useLocation, useNavigate } from "react-router";

type result = {
  id: number;
  name: string;
}[];

type Error = {
  addresstype?: string;
  address?: string;
  country?: string;
  state?: string;
  city?: string;
  pincode?: string;
};

const AddressTypeList = [
  { id: 1, name: "Home" },
  { id: 2, name: "Office" },
  { id: 2, name: "Other" },
];

const EditAddress = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const addressList = useAppSelector((state) => state.address.addressLists);
  const location = useLocation();
  const navData = location.state;
  const currentAdd = addressList?.find(
    (addr) => addr.address_id === parseInt(navData),
  );
  const [prevAddress, prevCity, prevState, prevCountry, prevPincode] =
    currentAdd?.street
      ? currentAdd?.street.split("%").map((ele) => ele.trim())
      : [];

  // console.log("location----->", location);
  // console.log("id-from-prev----->", navData);
  // console.log(
  //   "address----->",
  //   currentAdd?.street.split("%").map((ele) => ele.trim()),
  // );
  const [addresstype, setAddresstype] = useState<string | null>(null);
  const [address, setAddress] = useState<string>(prevAddress ?? "");
  const [country, setCountry] = useState<string | null>(null);
  const [currentState, setcurrentState] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [pincode, setPincode] = useState<string>(prevPincode ?? "");
  const [error, setError] = useState<Partial<Error>>({});
  const [btn, setbtn] = useState(true);

  const [countriesList, setCountriesList] = useState<result | []>([]);
  const [stateList, setStateList] = useState<result | []>([]);
  const [citiesList, setCitiesList] = useState<result | []>([]);

  const navigator = useNavigate();

  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });

    setTimeout(() => {
      setCountry(prevCountry);
    }, 200);

    setTimeout(() => {
      setcurrentState(prevState);
      setCity(prevCity);
    }, 700);
    setAddresstype(currentAdd?.floor ?? "");
  }, []);

  useEffect(() => {
    if (country) {
      const countryID = countriesList.find((state) => state.name === country);
      countryID &&
        GetState(countryID?.id).then((result) => {
          // console.log("state------>",result);
          setStateList(result);
        });
    }
  }, [country]);

  useEffect(() => {
    if (country && currentState) {
      const countryID = countriesList.find((state) => state.name === country);
      const stateID = stateList.find((state) => state.name === currentState);
      stateID &&
        countryID &&
        GetCity(countryID?.id, stateID?.id).then((result) => {
          setCitiesList(result);
        });
    }
  }, [country, currentState]);

  useEffect(() => {
    addresstype &&
      address &&
      country &&
      currentState &&
      city &&
      pincode &&
      setbtn(false);

    // console.log(addresstype, address, country, currentState, city, pincode);
  }, [addresstype, address, country, currentState, city, pincode]);

  function validate() {
    const newErrors: Error = {};

    if (!addresstype) {
      newErrors.addresstype = "Address type is required.";
    }

    if (!country) {
      newErrors.country = "Country is required.";
    }

    if (!currentState) {
      newErrors.state = "State is required.";
    }

    if (!city) {
      newErrors.city = "City is required.";
    }

    if (address.trim().length <= 6) {
      newErrors.address = "Address is required.";
    }

    if (pincode.length <= 3) {
      newErrors.pincode = "Valid zip code is required.";
    }

    setError(newErrors);
    setbtn(Object.keys(newErrors).length !== 0);
    return Object.keys(newErrors).length !== 0;
  }

  function handleSubmit() {
    if (!validate()) {
      setbtn(true);
      editAddress(
        accessToken,
        {
          street: `${address}%${city}%${currentState}%${country}%${pincode}`,
          floor: addresstype ?? "",
          zip_code: pincode,
        },
        navData,
      )
        .then((res) => {
          res && navigator(-1);
          setbtn(false);
        })
        .catch(() => setbtn(false));
    }
  }

  return (
    <div className="custom-scroll no-scrollbar h-full p-3 pb-5">
      <div className="relative flex justify-center py-4">
        <div className="absolute top-0 bottom-0 left-2 my-auto -mb-[2.8px] h-fit">
          <BackBtn size={40} />
        </div>
        <h1 className="heading2 py-0">Edit Addresses</h1>
      </div>
      <div className="p-3">
        <h3 className="heading2">Shopping Address</h3>
        <div className="py-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29759.049234383776!2d72.77584048840663!3d21.196879614057295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04c351ceae251%3A0x1d35b30f855a2c36!2sAdajan%2C%20Surat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1749623013910!5m2!1sen!2sin"
            width={450}
            height={450}
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full rounded-3xl"
          />
        </div>
        <div className="flex flex-col gap-2.5 py-4">
          <Select
            label="Address Type"
            optionList={AddressTypeList}
            value={addresstype}
            handleChange={setAddresstype}
            defaultOption="-- Select Address Type --"
            error={error.addresstype}
          />
          <InputLable
            error={error.address}
            label="Address"
            placeholder="Enter a Address"
            variantStyle="outline"
            value={address}
            handleChange={setAddress}
            payloadKey="address"
            setError={setError}
          />
          <Select
            error={error.country}
            label="Country"
            optionList={countriesList}
            value={country}
            handleChange={setCountry}
            defaultOption="-- Select Country --"
          />
          <Select
            error={error.state}
            label="State"
            optionList={stateList}
            value={currentState}
            handleChange={setcurrentState}
            defaultOption="-- Select State --"
          />
          <Select
            error={error.city}
            label="City"
            optionList={citiesList}
            value={city}
            handleChange={setCity}
            defaultOption="-- Select City --"
          />
          <InputLable
            error={error.pincode}
            label="Zip Code"
            type="number"
            placeholder="Enter a Zip Code"
            variantStyle="outline"
            value={pincode}
            handleChange={setPincode}
            payloadKey="pincode"
            setError={setError}
          />
        </div>
        <div className="mx-auto max-w-[75%]">
          <Button eventHandler={handleSubmit} state={btn}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditAddress;
