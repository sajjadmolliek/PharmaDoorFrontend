import image1 from "../../../assets/Image (2).png";
import productImage from "../../../assets/product.png";
import callImage from "../../../assets/download.png";
const ImageUploder = () => {
  const productImageStyle = {
    height: "100px",
  };
  return (
    <div className="flex flex-wrap gap-4 mx-auto justify-center p-4">
      <div className="flex bg-base-100  shadow-2xl mt-4  h-52  items-center gap-4 p-2">
        <div className="mt-18">
          <p>Upload Prescript</p>
          <button className="btn btn-accent mt-2">Upload</button>
        </div>
        <div>
          <img src={image1} alt="" />
        </div>
      </div>
      <div className="flex bg-base-100  shadow-2xl mt-4  h-52 items-center gap-4 p-2">
        <div className="mt-18">
          <p>Healthcare Product</p>
          <button className="btn btn-accent mt-2">Order Now</button>
        </div>
        <div>
          <img style={productImageStyle} src={productImage} alt="product" />
        </div>
      </div>
      <div className="flex bg-base-100  shadow-2xl mt-4 h-52 items-center gap-4 p-2">
        <div className="mt-18">
          <p>Help Line</p>
          <button className="btn btn-accent mt-2">Call Now</button>
        </div>
        <div>
          <img style={productImageStyle} src={callImage} alt="call" />
        </div>
      </div>
    </div>
  );
};

export default ImageUploder;
