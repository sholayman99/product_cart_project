import { useEffect, useState } from "react";
import {
    cartListRequest,
  removeCartRequest,
} from "../apiRequest/apiRequest";
import FullScreenLoader from "./FullScreenLoader";
import toast, { Toaster } from "react-hot-toast";

const CartList = () => {
    const [products, setProducts] = useState([]);
   const [loader, setLoader] = useState("d-none");
   const [refresh,setRefresh] = useState(0);

  useEffect(() => {
    (async () => {
      setLoader("");
      let data = await cartListRequest();
      setLoader("d-none");
      setProducts(data);
    })();
  }, [refresh]);

  const removeCart = async (id) => {
    setLoader("");
    let res = await removeCartRequest(id);
    setLoader("d-none");
    setRefresh(refresh+1);
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
                <img className="rounded-2" src={product['product']["image"]} />
                <div className="card-body">
                  <h5>{product['product']["title"]} </h5>
                  <p>${product['product']["price"]} </p>
                  <button
                    onClick={() => removeCart(product['product']["id"])}
                    className="btn btn-danger"
                  >
                   Remove
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

export default CartList;