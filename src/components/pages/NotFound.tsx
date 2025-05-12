import Button from "../atoms/Button/Button";

const NotFound = () => {
  return (
    <div className="flex h-[100dvh] w-full flex-col justify-center gap-8 bg-pink-400 px-[20%] text-center text-white">
      <h3 className="text-7xl font-semibold">404</h3>
      <div className="text-2xl font-medium capitalize">
        <span>Opps....</span>
        <p>page not found</p>
      </div>
      <Button to="/">
        <span className="text-xl">Home</span>
      </Button>
    </div>
  );
};

export default NotFound;
