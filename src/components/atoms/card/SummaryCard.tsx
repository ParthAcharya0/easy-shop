import { type Cart } from "./CartCard";

const SummaryCard = ({
  data,
  calculation,
}: {
  data: Cart[];
  calculation: [number, number, string];
}) => {
  const [deliveryCharges, promotion, total] = calculation;

  return (
    <div className="flex flex-col gap-4.5 py-4 capitalize">
      <h3 className="heading2">Summay Details</h3>
      <div className="flex flex-col gap-2 border-b border-gray-200 pb-2.5">
        {data.map((item) => (
          <Details data={item} key={item.id} />
        ))}
      </div>
      <div className="grid grid-cols-[1fr_1fr] gap-2 border-b border-gray-200 pb-2.5 text-sm leading-[1.2] font-medium text-gray-400">
        <span className="line-clamp-2 overflow-hidden">Promo Discount</span>
        <span className="text-right">${promotion}</span>
      </div>
      <div className="grid grid-cols-[1fr_1fr] gap-2 border-b border-gray-200 pb-2.5 text-sm leading-[1.2] font-medium text-red-400">
        <span className="line-clamp-2 overflow-hidden">Delivery Charges</span>
        <span className="text-right">${deliveryCharges}</span>
      </div>
      <div className="text grid grid-cols-[1fr_1fr] gap-2 text-sm leading-[1.2] font-medium">
        <span className="line-clamp-2 overflow-hidden">total</span>
        <span className="text-right">${total}</span>
      </div>
    </div>
  );
};

const Details = ({ data }: { data: Cart }) => {
  return (
    <div className="grid grid-cols-[50%_24px_1fr] gap-2 text-sm leading-[1.2]">
      <span className="line-clamp-1 overflow-hidden">{data.title}</span>
      <span>x{data.quantity}</span>
      <span className="text-right">
        ${parseInt(data.selling_price ?? data.price) * data.quantity}
      </span>
    </div>
  );
};

export default SummaryCard;
