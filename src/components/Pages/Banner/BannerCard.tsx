import ImageUploder from "./ImageUploder";

const BannerCard = () => {
  return (
    <div className="mt-5">
      <div className="text-center w-3/5 mx-auto">
        <h1 className="p-2  bg-base-100 h-10  font-bold">
          PharmaDoor: The Leading Online Pharmacy and Healthcare Platform of
          Bangladesh.
        </h1>
      </div>
      <div>
        <ImageUploder />
      </div>
    </div>
  );
};

export default BannerCard;
