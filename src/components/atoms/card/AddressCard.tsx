import { SelectedAddress } from "@/redux/reducers/addressSlice";
import { GiCheckMark } from "react-icons/gi";
import DropDown from "../DropDown/DropDown";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import deleteAddress from "@/api/deleteAddress";
import { useNavigate } from "react-router";
import { resetCurrentAddress } from "@/redux/actions/addressAction";

const AddressCard = ({
  data,
  active = false,
  isHaveOptions = false,
}: {
  data: Partial<SelectedAddress>;
  active?: boolean;
  isHaveOptions?: boolean;
}) => {
  const aceessToken = useAppSelector((state) => state.auth.accessToken);
  const dispatcher = useAppDispatch();
  const defaultAdd: Partial<SelectedAddress> = useAppSelector(
    (state) => state.address.selectedAddress,
  );
  const navigator = useNavigate();

  function deleteAdd() {
    if (defaultAdd.address_id === data?.address_id) {
      dispatcher(resetCurrentAddress());
    }
    deleteAddress(aceessToken, data?.address_id ?? 0);
  }

  function editAddr() {
    navigator("/edit", { state: data.address_id });
  }
  return (
    <div className="flex items-center justify-between gap-2 p-2">
      <div className="relative shrink-0">
        <img
          className="aspect-square w-18 rounded-full border border-gray-400 object-cover object-center p-2"
          src="https://img.freepik.com/premium-vector/house-with-approval-checkmark-icon-cartoon-style-isolated-white-background_96318-13778.jpg"
          alt=""
        />
        {active && (
          <div className="absolute -top-1.5 right-0 rounded-full bg-green-600 p-2">
            <GiCheckMark size={12} color="white" />
          </div>
        )}
      </div>
      <div className="flex shrink grow flex-col justify-between rounded-md bg-[rgba(255,255,255,0.22)] pr-2 text-base backdrop-blur-sm">
        <h4 className="py-0 font-medium capitalize">{data?.floor}</h4>
        <div className="flex flex-col justify-between gap-3 text-base text-gray-500 capitalize">
          {data?.street?.replaceAll("%", ", ")}
        </div>
      </div>
      <div className="shrink-0">
        {isHaveOptions ? (
          <div className="">
            <DropDown
              options={[
                { name: "Edit", func: editAddr },
                { name: "delete", func: deleteAdd },
              ]}
            />
          </div>
        ) : (
          <img
            className="aspect-square w-24 rounded-full object-cover object-center"
            src="https://images.unsplash.com/photo-1587937533522-b2294fd611f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        )}
      </div>
    </div>
  );
};

export default AddressCard;
