import Button from "@/components/atoms/Button/Button";
import BackBtn from "../../atoms/Button/BackBtn";
import HeaderLink from "../../atoms/text/HeaderLink";
import { useEffect, useState } from "react";
import getAddress from "@/api/getAddress";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setAddressList,
  setCurrentAddress,
} from "@/redux/actions/addressAction";
import AddressCard from "@/components/atoms/card/AddressCard";
import { SelectedAddress } from "@/redux/reducers/addressSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AllAddress = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const allAddress = useAppSelector((state) => state.address.addressLists);
  const currentSelected = useAppSelector(
    (state) => state.address.selectedAddress,
  );
  const [selected, setSelected] =
    useState<Partial<SelectedAddress>>(currentSelected);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigator = useNavigate();

  useEffect(() => {
    setLoading(true);
    getAddress(accessToken)
      .then((res) => {
        dispatch(setAddressList(res));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function handleSubmit() {
    if (Object.keys(selected).length === 0 && selected) {
      toast.error("you need pick one address");
      return;
    }
    // @ts-ignore
    dispatch(setCurrentAddress(selected));
    navigator("/cart");
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
