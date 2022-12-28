import axios,{AxiosResponse} from "axios";

axios.defaults.withCredentials = true;

const baseURL = process.env.REACT_APP_API;


export const registerUser = async (user: object): Promise<any> => {
  const response = await axios.post(`${baseURL}/register`, user);
  return response.data;
};

export const accountActivation = async (data: any): Promise<any> => {
  const response = await axios.post(`${baseURL}/account-activation`, data);
  return response.data;
};

export const loginUser = async (user: object): Promise<any>=> {
  const response = await axios.post(`${baseURL}/login`, user);
  return response.data;
};
export const UserProfile = async () => {
  const response = await axios.get(`${baseURL}/profile`, {
    withCredentials: true,
  });
  return response.data;
};

export const authorizeUser = async (token: string): Promise<any> => {
  const response = await axios.get(`${baseURL}/auth-check`, {
    headers: { Authorization: token },
  });
  return response;
};

export const logoutUser = async (): Promise<AxiosResponse> => {
    const baseURL: string = '';
    const response: AxiosResponse = await axios.get(`${baseURL}/logout`, {
      withCredentials: true,
    });
    return response;
  };
