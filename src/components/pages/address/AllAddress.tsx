import Button from "@/components/atoms/button/Button";
import BackBtn from "../../atoms/button/BackButton";
import HeaderLink from "../../atoms/text/HeaderLink";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setAddressList,
  setCurrentAddress,
} from "@/redux/actions/addressAction";
import AddressCard from "@/components/atoms/card/AddressCard";
import { SelectedAddress } from "@/redux/reducers/addressSlice";
import { toast } from "react-toastify";
import { getAddressList } from "@/api/address";
import { useNavigate } from "react-router";

export const fetchAddressList = (
  dispatch: any,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading?.(true);
  getAddressList()
    .then((res) => {
      dispatch(setAddressList(res.data.addressDetails));
      setLoading?.(false);
    })
    .catch(() => setLoading?.(false));
};


const AllAddress = () => {
  const allAddress = useAppSelector((state) => state.address.addressLists);
  const currentSelected = useAppSelector(
    (state) => state.address.selectedAddress,
  );
  const [selected, setSelected] =
    useState<Partial<SelectedAddress>>(currentSelected);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // function fetchAddressList() {
  //   setLoading(true);
  //   getAddressList()
  //     .then((res) => {
  //       dispatch(setAddressList(res.data.addressDetails));
  //       setLoading(false);
  //     })
  //     .catch(() => setLoading(false));
  // }

  useEffect(() => {
    fetchAddressList(dispatch, setLoading);
  }, []);

  function handleSubmit() {
    if (Object.keys(selected).length === 0 && selected) {
      toast.error("you need pick one address");
      return;
    }
    // @ts-ignore
    dispatch(setCurrentAddress(selected));
    navigate(-1);
  }

  return (
    <div className="custom-scroll no-scrollbar flex h-full flex-col p-3 pb-5">
      <div className="relative flex justify-center py-4">
        <div className="absolute top-0 bottom-0 left-2 my-auto -mb-[2.8px] h-fit">
          <BackBtn size={40} />
        </div>
        <h1 className="heading2 py-0">Addresses</h1>
      </div>
      {loading ? (
        <p className="flex h-[75dvh] items-center justify-center text-center font-medium">
          <span className="loader w-2xl"></span>
        </p>
      ) : (
        <>
          <div className="pt-3">
            <HeaderLink heading="Shopping Address" subHeading="ADD" to="/add" />
            {allAddress.length === 0 ? (
              <p className="flex h-[75dvh] items-center justify-center text-center font-medium">
                <span className="w-2xl">No Address Added Yet</span>
              </p>
            ) : (
              <div className="flex flex-col gap-3 pt-4">
                {allAddress.map((address) => (
                  <button
                    className="cursor-pointer text-left"
                    onClick={() => setSelected(address)}
                    key={address.address_id}
                  >
                    <AddressCard
                      data={address}
                      active={address.address_id === selected?.address_id}
                      isHaveOptions={true}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="mx-auto mt-auto w-full max-w-[75%]">
            <Button eventHandler={handleSubmit}>Continue</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllAddress;
