import {
  LOADING_BANNERS,
  FETCH_BANNERS_LIST,
  DELETE_BANNER,
  FETCH_BANNER_IMAGES,
  ACTIVE_BANNER_IMAGE,
  DELETE_BANNER_IMAGE,
  BANNERS_ERROR,
  CLEAR_BANNER_ERROR,
} from "../types";

const initialState = {
  loading: false,
  error: null,
  bannersList: {},
  bannerImages: {},
};

/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_BANNERS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BANNERS_LIST:
      return {
        ...state,
        loading: false,
        bannersList: action.payload,
      };
    case DELETE_BANNER:
      return {
        ...state,
        bannersList: {
          ...state.bannersList,
          readableBanners: [
            ...state.bannersList.readableBanners.filter(
              (banner) => banner.id !== action.payload
            ),
          ],
        },
      };
    case FETCH_BANNER_IMAGES:
      return {
        ...state,
        loading: false,
        bannerImages: action.payload,
      };
    case ACTIVE_BANNER_IMAGE:
      return {
        ...state,
        bannerImages: {
          ...state.bannerImages,
          bannerImages: [
            ...state.bannerImages.bannerImages.map((image) =>
              image.id === action.payload.id
                ? { ...image, active: action.payload.active }
                : image
            ),
          ],
        },
      };
    case DELETE_BANNER_IMAGE:
      return {
        ...state,
        bannerImages: {
          ...state.bannerImages,
          bannerImages: [
            ...state.bannerImages.bannerImages.filter(
              (image) => image.id !== action.payload
            ),
          ],
        },
      };
    case BANNERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_BANNER_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
