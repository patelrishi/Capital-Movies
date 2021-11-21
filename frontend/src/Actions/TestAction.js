import axios from "axios";
import API from "../api";
export async function TestAction() {
  // const { data } = await axios.get("http://localhost:8000/api/v1/products/");
  const data = API.get("/products");

  return data;
}

export async function TestProduct(pid) {
  const { data } = await axios.get(
    `http://localhost:8000/api/v1/products/${pid}`
  );

  return data;
}
