import {
    EDIT_CATALOG_DATA_SET,
    ERROR_LOADING_PRODUCTS_FOR_CATEGORY,
    GET_CATALOG_LIST,
    LOADING_CATALOGS,
    SET_CATALOG_ERROR,
    SET_PRODUCTS_LIST_FETCHED,
} from "../types";

import axios from "axios";
import {showSnackBar} from "./SnackbarActions";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getCatalogList = () => async (dispatch) => {
    try {
        dispatch({type: LOADING_CATALOGS});

        let url = `${baseUrl}/private/catalogs`;
        const {data} = await   axios.get(url);

        dispatch({type: GET_CATALOG_LIST, payload: data});
    } catch (error) {
        console.log(error);
    }

};


export const getProductsBasedOnCategoryId = (categoryId) => async (dispatch) => {

    try {
        dispatch({type: LOADING_CATALOGS})

        const {data} = await axios.get(
            `${baseUrl}/private/catalog/category/${categoryId}`
        );

        console.log("products received : " , data);
        dispatch({type: SET_PRODUCTS_LIST_FETCHED, payload:  {
                productsList : data.products ,
                allProductsList:  data.products
            }});

    } catch (error) {
        console.log(error);
        dispatch({type: ERROR_LOADING_PRODUCTS_FOR_CATEGORY, payload: "Something went wrong"});
    }

};


export const createCatalog = (catalogRequest , method) => async (dispatch) => {
    try {

        let url = `${baseUrl}/private/catalog/save`;
        let data = null;

        if(method === "put") {
            data = await axios.put(url , catalogRequest);
        } else {
            data = await axios.post(url , catalogRequest);
        }
        dispatch(showSnackBar("success" , "Saved Catalog Successfully"));

    } catch (error) {
        console.log(error);
        dispatch(showSnackBar("error" , "Error saving Catalog"));
        throw error;
    }
};


export const getCatalogInfo = (catalogCode) => async (dispatch) => {

    try {

        dispatch({type: LOADING_CATALOGS});
        let url = `${baseUrl}/catalog/${catalogCode}/products`;
        const {data} = await  axios.get(url);
        console.log("received data : " , data);

        let categoryIdReceived = data.products.map(prod => prod.categories.flatMap((cat) => cat.id))
            .map(ele => ele)
            .flatMap((arr) => arr);

            dispatch({
            type: EDIT_CATALOG_DATA_SET,
            payload: {
                    selectedProductsList : data.products,
                    selectedCategoryId :  categoryIdReceived[0] || 0,
                }
            });

    } catch (error) {
        console.log(error);
        dispatch({type: SET_CATALOG_ERROR, payload: "Something went wrong"});
    }

};