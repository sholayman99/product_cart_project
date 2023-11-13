import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { userLoginRequest } from "../apiRequest/apiRequest";
import { useNavigate } from "react-router-dom";
import FullScreenLoader from "./FullScreenLoader";


const LoginPage = () => {
    
  const [formValue, setFormValue] = useState({ UserEmail: "" });
  const [loader,setLoader] = useState('d-none');
  const navigate = useNavigate()


 const InputOnChange =(key,value) => {
    setFormValue(formValue => ({
        ...formValue,
        [key] : value
    }))
 }

 const submitForm = async () =>{
  if(formValue.UserEmail.length === 0) {
    toast.error("Email Address is required")
  }else{
    setLoader('')
    let msg = await userLoginRequest(formValue);
    setLoader('d-none')
    if(msg === "success"){
      toast.success("4 Digit has been sent to Your Email Address")  ;
      navigate('/otp')
    }else{
        toast.error("Invalid Email Address")
    }
    
  }
 }


  return (
    <>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card p-5">
            <h3>Login</h3>
            <label>UserEmail:</label>
            <input
              value={formValue.UserEmail}
              onChange={(e) => InputOnChange("UserEmail" , e.target.value)}
              type="email"
              placeholder="Your Email Address"
              className="form-control"
            />
            <button onClick={submitForm} className="btn btn-primary my-2">Next</button>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
    <FullScreenLoader visibility={loader} />
    </>
  );
};

export default LoginPage;
