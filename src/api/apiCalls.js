import { API_STATUS_LIST, API_URL } from "../utils/constants";

export const getRequest = async ({
  setApiStatus,
  setErrorMessage,
  searchQuery,
  isQuery,
  bookId,
}) => {
  try {
    const res = await fetch(
      `${API_URL}${isQuery ? "?" + searchQuery : "/" + bookId}`
    );
    const data = await res.json();
    if (res.ok) {
      setApiStatus(API_STATUS_LIST.success);
    } else {
      setApiStatus(API_STATUS_LIST.error);
      setErrorMessage(data.message);
    }
    return data;
  } catch (error) {
    setApiStatus(API_STATUS_LIST.error);
    setErrorMessage(error.message);
  }
};

export const postRequest = async ({
  setApiStatus,
  setErrorMessage,
  requestData,
}) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    };
    const res = await fetch(API_URL, options);
    const data = await res.json();
    if (res.ok) {
      setApiStatus(API_STATUS_LIST.success);
    } else {
      setApiStatus(API_STATUS_LIST.error);
      setErrorMessage(data.message);
    }
    return data;
  } catch (error) {
    setApiStatus(API_STATUS_LIST.error);
    setErrorMessage(error.message);
  }
};

export const putRequest = async ({
  setApiStatus,
  setErrorMessage,
  requestData,
  bookId,
}) => {
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    };
    const res = await fetch(API_URL + bookId, options);
    const data = await res.json();
    if (res.ok) {
      setApiStatus(API_STATUS_LIST.success);
    } else {
      setApiStatus(API_STATUS_LIST.error);
      setErrorMessage(data.message);
    }
    return data;
  } catch (error) {
    setApiStatus(API_STATUS_LIST.error);
    setErrorMessage(error.message);
  }
};

export const deleteRequest = async ({
  setApiStatus,
  setErrorMessage,
  bookId,
}) => {
  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(API_URL + bookId, options);
    const data = await res.json();
    if (res.ok) {
      setApiStatus(API_STATUS_LIST.success);
    } else {
      setApiStatus(API_STATUS_LIST.error);
      setErrorMessage(data.message);
    }
    return data;
  } catch (error) {
    setApiStatus(API_STATUS_LIST.error);
    setErrorMessage(error.message);
  }
};
