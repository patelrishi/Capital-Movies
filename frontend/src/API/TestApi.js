import API from "../api";

export async function TestAction() {
  const data = API.get("/products");

  return data;
}

export async function TestProduct(pid) {
  const data = API.get(`products/${pid}`);

  return data;
}
