import axios from "axios";
import {
  ManageTokenExpire,
  getToken,
  setEmail,
  setToken,
} from "../utility/OtpHelper";

const Base_Url = "https://cart-api.teamrabbil.com/api";

export async function userLoginRequest(postBody) {
  try {
    let res = await axios.post(`${Base_Url}/user-login`, postBody);
    console.log(setEmail(postBody["UserEmail"]));
    setEmail(postBody["UserEmail"]);
    return res.data["msg"];
  } catch (error) {
    return false;
  }
}

export async function otpVerifyRequest(postBody) {
  console.log(postBody);
  try {
    let res = await axios.post(`${Base_Url}/verify-login`, postBody);

    if (res.data["msg"] === "success") {
      setToken(res.data["data"]);
    }

    return res.data["msg"];
  } catch (error) {
    return false;
  }
}

export async function productListRequest() {
  try {
    let res = await axios.get(`${Base_Url}/product-list`);
    return res.data["data"];
  } catch (error) {
    return [];
  }
}

let config = {
  headers: {
    token: getToken(),
  },
};
console.log(config)

export async function createCartRequest(productId) {
  try {
    let res = await axios.get(`${Base_Url}/create-cart/${productId}`, config);
    return res.data["msg"];
  } catch (error) {
    ManageTokenExpire(error.response.status);
  }
}

export async function cartListRequest() {
  try {
    let res = await axios.get(`${Base_Url}/cart-list`, config);
    return res.data["data"];
  } catch (error) {
    ManageTokenExpire(error.response.status);
  }
}

export async function removeCartRequest(productId) {
  try {
    let res = await axios.get(`${Base_Url}/remove-cart/${productId}`, config);
    return res.data["msg"];
  } catch (error) {
    ManageTokenExpire(error.response.status);
  }
}
