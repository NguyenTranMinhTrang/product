import types from "../types";
import store from "../store";
import axiosInstance from "../../api/axiosInstance";
import axios from "axios";

const { dispatch } = store;


/* Get */
export const getProductBegin = () => ({
    type: types.GET_PRODUCT_BEGIN
});

export const getProductSuccess = (myProducts) => ({
    type: types.GET_PRODUCT_SUCCESS,
    payload: { myProducts }
});


export const getProductFailure = (error) => ({
    type: types.GET_PRODUCT_FAILURE,
    payload: { error }
});

export const getProduct = (limit) => {
    console.log("1: ", new Date());
    dispatch(getProductBegin());
    let apiUrl = `?limit=${limit}`;
    return axiosInstance.get(apiUrl)
        .then((response) => {
            console.log("1.1: ", new Date());
            if (response.status == 200) {
                dispatch(getProductSuccess(response.data));
                return "get product";
            }
            else {
                dispatch(getProductFailure(response.data));
            }
        })
        .catch((error) => {
            dispatch(getProductFailure(error));
        });
}

export const getCategories = () => {
    console.log("2: ", new Date());
    return axiosInstance.get("/categories")
        .then((response) => {
            console.log("2.2: ", new Date());
            if (response.status == 200) {
                dispatch(getAllCategories(response.data));
                return "get categories";
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

/* Post */

export const postProductBegin = () => ({
    type: types.POST_PRODUCT_BEGIN
});

export const postProductSucess = (addProduct) => ({
    type: types.POST_PRODUCT_SUCCESS,
    payload: { addProduct }
});


export const postProductFailure = (error) => ({
    type: types.POST_PRODUCT_FAILURE,
    payload: { error }
});

export const postProduct = (addProduct) => {
    dispatch(postProductBegin());
    return axiosInstance.post("", addProduct)
        .then((response) => {
            if (response.status == 200) {
                dispatch(postProductSucess(response.data));
                return true;
            }
            else {
                dispatch(postProductFailure(response.data));
                return false;
            }
        })
        .catch((error) => {
            dispatch(postProductFailure(error));
            return false;
        })
}

/* Update */

export const updateProductBegin = () => ({
    type: types.EDIT_PRODUCT_BEGIN
});

export const updateProductSucess = (updateProduct) => ({
    type: types.EDIT_PRODUCT_SUCCESS,
    payload: { updateProduct }
});


export const updateProductFailure = (error) => ({
    type: types.EDIT_PRODUCT_FAILURE,
    payload: { error }
});

export const updateProduct = (id, updateObject) => {
    let apiUrl = `/${id}`;
    dispatch(updateProductBegin());
    return axiosInstance.put(apiUrl, updateObject)
        .then((response) => {
            if (response.status == 200) {
                dispatch(updateProductSucess(response.data));
            }
            else {
                dispatch(updateProductFailure(response.data));
            }
        })
        .catch((error) => {
            dispatch(updateProductFailure(error));
        })
}

/* Delete */

export const deleteProductBegin = () => ({
    type: types.DELETE_PRODUCT_BEGIN
});

export const deleteProductSucess = (deleteProduct) => ({
    type: types.DELETE_PRODUCT_SUCCESS,
    payload: { deleteProduct }
});


export const deleteProductFailure = (error) => ({
    type: types.DELETE_PRODUCT_FAILURE,
    payload: { error }
});

export const deleteProduct = (id) => {
    let apiUrl = `/${id}`;

    dispatch(deleteProductBegin());
    return axiosInstance.delete(apiUrl)
        .then((response) => {
            if (response.status == 200) {
                dispatch(deleteProductSucess(response.data));
            }
            else {
                dispatch(deleteProductFailure(response.data));
            }
        })
        .catch((error) => {
            dispatch(deleteProductFailure(error));
        })
}

export const getAllCategories = (categories) => ({
    type: types.GET_ALL_CATEGORIES,
    payload: { categories }
});



