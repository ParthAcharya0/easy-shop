const SummaryCard = () => {
  return (
    <div className="flex flex-col gap-4.5 py-4 capitalize">
      <h3>Summay Details</h3>
      <div className="flex flex-col gap-2 border-b border-gray-200 pb-2.5">
        <div className="grid grid-cols-[50%_24px_1fr] gap-2 text-sm leading-[1.2]">
          <span className="line-clamp-2 overflow-hidden">
            colorful Short T-Shirt Short
          </span>
          <span>x2</span>
          <span className="text-right">$20.00</span>
        </div>
        <div className="grid grid-cols-[50%_24px_1fr] gap-2 text-sm leading-[1.1]">
          <span className="line-clamp-2 overflow-hidden">
            colorful Short T-Shirt Short T-Shirt
          </span>
          <span>x1</span>
          <span className="text-right">$85.00</span>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_1fr] gap-2 text-sm leading-[1.2] font-medium text-gray-400 border-b border-gray-200 pb-2.5">
        <span className="line-clamp-2 overflow-hidden">Promo Discount</span>
        <span className="text-right">$2.50</span>
      </div>
      <div className="grid grid-cols-[1fr_1fr] gap-2 text-sm leading-[1.2] font-medium text-red-400 border-b border-gray-200 pb-2.5">
        <span className="line-clamp-2 overflow-hidden">Delivery Charges</span>
        <span className="text-right">$2.50</span>
      </div>
      <div className="text grid grid-cols-[1fr_1fr] gap-2 text-sm leading-[1.2] font-medium">
        <span className="line-clamp-2 overflow-hidden">total</span>
        <span className="text-right">$105.00</span>
      </div>
    </div>
  );
};

export default SummaryCard;
