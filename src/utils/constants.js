export const API_STATUS_LIST = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  error: "ERROR",
};

export const API_URL =
  process.env.REACT_APP_API_URL_TYPE ===
  process.env.REACT_APP_LOCAL_API_URL_TYPE_NAME
    ? process.env.REACT_APP_LOCAL_API_URL
    : process.env.REACT_APP_PRODUCTION_API_URL;

export const ALL_NAVIGATION_LINKS = {
  home: {
    name: "HOME",
    path: "/",
  },
  bookDetails: {
    name: "BOOK DETAILS",
    path: "/book-details",
  },
  searchResults: {
    name: "SEARCH RESULTS",
    path: "/search-results",
  },
  contact: {
    name: "CONTACT",
    path: "/contact",
  },
  about: {
    name: "ABOUT",
    path: "/about",
  },
};

export const ALL_POPUP_TYPES = {
  confirmation: "CONFIRMATION",
  form: "FORM",
};

export const STATIC_IMAGE_URL =
  "https://res.cloudinary.com/dwgpba5n2/image/upload/v1734339063/book_3145740_ayv8lp.png";
