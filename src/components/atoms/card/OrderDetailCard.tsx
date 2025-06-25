const OrderDetailCard = ({
  data,
}: {
  data: {
    product_id: number;
    quantity: number;
    price: string;
    title: string;
    image: string;
  };
}) => {
  return (
    <div className="flex w-full items-center justify-between gap-2 border-b border-gray-300 py-3 text-black">
      <div className="img-holder aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-lg">
        <img
          className="aspect-square h-full w-full object-cover object-center"
          src={data.image}
          alt=""
        />
      </div>
      <div className="flex grow flex-col justify-between rounded-md bg-[rgba(255,255,255,0.22)] text-base backdrop-blur-sm">
        <h4 className="py-0 font-medium capitalize">{data.title}</h4>
        <div className="flex flex-col justify-between gap-3 text-base text-gray-500">
          <span>quantity: {data.quantity}</span>
          <span>${data.price}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailCard;

// const OrderDetailCard = () => {
//   return (
//     <div className="flex w-full items-center justify-between gap-2 border-b border-gray-300 py-3 text-black">
//       <div className="img-holder aspect-square h-20 w-20 overflow-hidden rounded-lg">
//         <img
//           className="aspect-square h-full w-full object-cover object-center"
//           src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
//           alt=""
//         />
//       </div>
//       <div className="flex grow flex-col justify-between rounded-md bg-[rgba(255,255,255,0.22)] text-base backdrop-blur-sm">
//         <h4 className="py-0 font-medium capitalize">red Nike</h4>
//         <div className="flex flex-col justify-between gap-3 text-base text-gray-500">
//           <span>white</span>
//           <span>$10.00</span>
//         </div>
//       </div>
//     </div>
//   );
// };
