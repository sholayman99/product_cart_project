import { useEffect, useState } from "react";
import {
  createCartRequest,
  productListRequest,
} from "../apiRequest/apiRequest";
import FullScreenLoader from "./FullScreenLoader";
import toast, { Toaster } from "react-hot-toast";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState("d-none");

  useEffect(() => {
    (async () => {
      setLoader("");
      let data = await productListRequest();
      setLoader("d-none");
      setProducts(data);
    })();
  }, []);

  const addToCart = async (id) => {
    setLoader("");
    let res = await createCartRequest(id);
    setLoader("d-none");
    if (res === "success") {
      toast.success("Added Successfully");
    } else {
      toast.error("Unable to add");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row gap-3">
          {products.map((product, index) => (
            <div className="col-md-3" key={index}>
              <div className="card w-full rounded-4">
                <img className="rounded-2" src={product["image"]} />
                <div className="card-body">
                  <h5>{product["title"]} </h5>
                  <p>${product["price"]} </p>
                  <button
                    onClick={() => addToCart(product["id"])}
                    className="btn btn-info"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Toaster position="top-center" />
      </div>
      <FullScreenLoader visibility={loader} />
    </>
  );
};

export default ProductList;
