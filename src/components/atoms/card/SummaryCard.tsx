import { Cart } from "./CartCard";

// const data = {
//   category_id: 1,
//   subcategory_id: 1,
//   isFav: false,
//   id: 1,
//   title: "Progresso Traditional, Chicken Noodle Soup",
//   image:
//     "http://res.cloudinary.com/dhtkusrbf/image/upload/v1715580960/instacart/products/qyomidurumcakcw6c1x8.webp",
//   label: "19 kg",
//   actual_price: "4.99",
//   selling_price: "4.99",
//   discount_label: "Buy 1, get 1",
//   quantity: 1,
// };

const SummaryCard = ({ data }: { data: Cart[] }) => {
  const deliveryCharges = 2.5;
  const promotion = 2.5;
  const total = calculateTotal(data).toFixed(2);
  console.log();

  function calculateTotal(cartData: Cart[]): number {
    return (
      cartData.reduce((total, item) => {
        return total + parseFloat(item.selling_price) * item.quantity;
      }, 0) +
      deliveryCharges +
      promotion
    );
  }

  return (
    <div className="flex flex-col gap-4.5 py-4 capitalize">
      <h3 className="heading2">Summay Details</h3>
      <div className="flex flex-col gap-2 border-b border-gray-200 pb-2.5">
        {data.map((item) => (
          <Details data={item} />
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

const Details = ({ data }:{data:Cart}) => {
  return (
    <div className="grid grid-cols-[50%_24px_1fr] gap-2 text-sm leading-[1.2]">
      <span className="line-clamp-1 overflow-hidden">{data.title}</span>
      <span>x{data.quantity}</span>
      <span className="text-right">${data.selling_price}</span>
    </div>
  );
};

export default SummaryCard;
