import HeaderLink from "../text/HeaderLink";

const AddressCard = () => {
  return (
    <div className="pt-3">
      <HeaderLink heading="Address" subHeading="Edit" to="/" />
      <div className="flex items-center justify-between gap-2 p-2">
        <div className="shrink-0">
          <img
            className="aspect-square w-18 rounded-full border border-gray-400 object-cover object-center p-2"
            src="https://img.freepik.com/premium-vector/house-with-approval-checkmark-icon-cartoon-style-isolated-white-background_96318-13778.jpg"
            alt=""
          />
        </div>
        <div className="flex grow flex-col justify-between rounded-md bg-[rgba(255,255,255,0.22)] pr-2 text-base backdrop-blur-sm">
          <h4 className="py-0 font-medium capitalize">red Nike</h4>
          <div className="flex flex-col justify-between gap-3 text-base text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            tenetur
          </div>
        </div>
        <div className="shrink-0">
          <img
            className="aspect-square w-24 rounded-full object-cover object-center"
            src="https://images.unsplash.com/photo-1587937533522-b2294fd611f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
