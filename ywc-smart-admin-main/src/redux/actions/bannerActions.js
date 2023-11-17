import {
  LOADING_BANNERS,
  FETCH_BANNERS_LIST,
  DELETE_BANNER,
  FETCH_BANNER_IMAGES,
  ACTIVE_BANNER_IMAGE,
  DELETE_BANNER_IMAGE,
  BANNERS_ERROR,
  CLEAR_BANNER_ERROR,
  SET_SNACKBAR,
} from "../types";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

// get banner list
export const getBannersList = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_BANNERS });
    const { data } = await axios.get(`${baseUrl}/private/banners
        `);
    dispatch({ type: FETCH_BANNERS_LIST, payload: data });
    dispatch({ type: CLEAR_BANNER_ERROR });
  } catch (error) {
    dispatch({
      type: BANNERS_ERROR,
      payload: "Server erorr try again later!!",
    });
  }
};

// creat Banner Name
export const createBannerName = (bannerData) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_BANNERS });
    await axios.post(`${baseUrl}/private/banner`, bannerData);
    dispatch({
      type: SET_SNACKBAR,
      payload: {
        alert: "success",
        message: "Banner Name created successfully.",
      },
    });
    dispatch({ type: CLEAR_BANNER_ERROR });
  } catch (error) {
    if (error.response && error.response.status === 400) {
      dispatch({
        type: BANNERS_ERROR,
        payload: "Banner already created in this name.",
      });
    } else {
      dispatch({
        type: BANNERS_ERROR,
        payload: "Server erorr try again later!!",
      });
    }
  }
};

// delete banner by id
export const deleteBanner = (id) => async (dispatch) => {
  try {
    await axios.delete(`${baseUrl}/private/banner/${id}`);
    dispatch({ type: DELETE_BANNER, payload: id });
  } catch (error) {
    console.log(error);
  }
};

// update banner Name
export const updateBanner = (bannerData, id, history) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_BANNERS });
    await axios.put(`${baseUrl}/private/banner/${id}`, bannerData);
    dispatch({ type: CLEAR_BANNER_ERROR });
    history.push("/admin/banners");
  } catch (error) {
    console.log(error);
  }
};

// get banner images by Id
export const getBannerImages = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_BANNERS });
    const { data } = await axios.get(`${baseUrl}/private/banner/${id}/images`);
    dispatch({ type: FETCH_BANNER_IMAGES, payload: data });
    dispatch({ type: CLEAR_BANNER_ERROR });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      dispatch({ type: BANNERS_ERROR, payload: error.response.data });
    } else {
      console.log(error);
    }
  }
};

// upload Banner Image
export const uploadBannerImage = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_BANNERS });
    await axios.post(`${baseUrl}/private/banner/${id}/images`, formData);
    dispatch({
      type: SET_SNACKBAR,
      payload: {
        alert: "success",
        message: "Banner Image uploaded successfully.",
      },
    });
    dispatch(getBannerImages(id));
    dispatch({ type: CLEAR_BANNER_ERROR });
  } catch (error) {
    console.log(error);
  }
};

export const updateBannerImage = (activeData, imageId) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/private/banner/image/${imageId}`,
      activeData
    );
    dispatch({ type: ACTIVE_BANNER_IMAGE, payload: data });
    dispatch({ type: CLEAR_BANNER_ERROR });
  } catch (error) {
    console.log(error);
  }
};

export const deleteBannerImage = (id) => async (dispatch) => {
  try {
    await axios.delete(`${baseUrl}/private/banner/image/${id}`);
    dispatch({ type: DELETE_BANNER_IMAGE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
