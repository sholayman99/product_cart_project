import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { otpVerifyRequest } from "../apiRequest/apiRequest";
import FullScreenLoader from "./FullScreenLoader";
import { getEmail } from "../utility/OtpHelper";

const VerifyOtpPage = () => {
    
  const [formValue, setFormValue] = useState({
    UserEmail: getEmail(),
    OTP: "",
  });

  const [loader, setLoader] = useState("d-none");

  const InputOnChange = (key, value) => {
    setFormValue((formValue) => ({
      ...formValue,
      [key]: value,
    }));
  };

  const submitForm = async () => {
    if (formValue.OTP.length === 0) {
      toast.error("OTP is required");
    } else {
      setLoader("");
      let msg = await otpVerifyRequest(formValue);
      setLoader("d-none");
      if (msg === "success") {
        toast.success("4 Digit has been sent to Your OTP");
        window.location.href = "/";
      } else {
        toast.error("Invalid OTP");
      }
    }
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card p-5">
              <h3>OTP Verification</h3>
              <label>OTP Code:</label>
              <input
                value={formValue.OTP}
                onChange={(e) => InputOnChange("OTP", e.target.value)}
                type="email"
                placeholder="Your OTP"
                className="form-control"
              />
              <button onClick={submitForm} className="btn btn-primary my-2">
                Next
              </button>
            </div>
          </div>
        </div>
        <Toaster position="top-center" />
      </div>
      <FullScreenLoader visibility={loader} />
    </>
  );
};

export default VerifyOtpPage;
