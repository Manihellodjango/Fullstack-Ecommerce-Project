import { useSelector } from "react-redux";

export const useFetchStoreData = () => {
   
    const {token, userData} = useSelector((state:any) => state.user.data);
    const {cartItems} = useSelector((state:any) => state.cart);
    return {token, userData,cartItems};

}
 
