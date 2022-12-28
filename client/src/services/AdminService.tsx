import axios, { AxiosResponse } from "axios";

axios.defaults.withCredentials = true;

const baseURL = process.env.REACT_APP_API;

export async function createCategory({ name, token }: { name: string, token: string }): Promise<AxiosResponse> {
  const response = await axios.post(`${baseURL}/categories`,{name}, {
    headers: { Authorization: token },
  });
  return response;
};

export const getCategories = async () => {
  const response = await axios.get(`${baseURL}/categories`);
  return response.data;
};

export async function deleteCategory({ id, token }: { id: string, token: string }): Promise<AxiosResponse>  {
  const response = await axios.delete(`${baseURL}/categories/${id}`,{
    headers: { Authorization: token },
  });
  return response.data;
};

//product services
export const createProduct = async (newProduct: object, token: string): Promise<object> => {
  const response = await axios.post(`${baseURL}/products`,newProduct,{
    headers: { Authorization: token },
  });
  return response;
};


export const getProducts = async (page: number): Promise<any> => {
  const response = await axios.get(`${baseURL}/products?page=${page}`);
  return response.data;
};

// search products

export const searchProducts = async (searchValue:string) => {
  const response = await axios.get(`${baseURL}/products/search/${searchValue}`);
  return response.data;
};


export const getTotalNumberOfProducts = async () => {
  const response = await axios.get(`${baseURL}/products-count`);
  return response.data;
};

export const getFilteredProducts = async (checkedCategories:string[],checkedPrice:string[]):Promise<any> => {
  const response = await axios.post(`${baseURL}/filtered-products`,{checkedCategories,checkedPrice});
  return response.data;
};

export async function deleteProduct ({ id, token }: { id: string, token: string }): Promise<AxiosResponse>   {
  const response = await axios.delete(`${baseURL}/products/${id}`,{
    headers: { Authorization: token },
  });
  return response.data;
};

