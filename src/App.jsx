import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getToken } from "./utility/OtpHelper";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Otp from "./pages/Otp";


const App = () => {
if(getToken()){
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Product />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
    </BrowserRouter>
    )
  }else{
    return(
      <BrowserRouter>
      <Routes>
      <Route path="/" element={ <Product />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<Otp />} />
    </Routes>
      </BrowserRouter>
    )
  }  
}
export default App;