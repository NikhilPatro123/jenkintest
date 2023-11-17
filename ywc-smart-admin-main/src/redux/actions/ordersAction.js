
import { ORDER_LOADING, ORDER_LOADED, ORDER_LOADING_ERROR } from "../types";



import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;


export const loadOrders = () => async (dispatch) => {

    try {
        dispatch({ type: ORDER_LOADING });

        const { data } = await axios.get(`${baseUrl}/admin/orders`);
        dispatch({ type: ORDER_LOADED, payload: data });

    } catch (error) {
        dispatch({ type: ORDER_LOADING_ERROR, payload: "Error in Loading Order" });
        console.log(error);
    }

}

