import axios from "axios";

const postWithoutHeader =
  (api) =>
  (data, timeout = true) => {
    return axios.post(
      api,
      data,
      {
        method: "POST",
      },
      timeout
    );
  };

const getWithHeader =
  (api) =>
  (params, timeout = true) => {
    const token = localStorage.getItem("token");
    return axios.get(
      api,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: params,
      },
      timeout
    );
  };

const postWithHeader =
  (api) =>
  (data, timeout = true) => {
    const token = localStorage.getItem("token");
    return axios.post(
      api,
      data,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      timeout
    );
  };

const putUploadImage =
  (api) =>
  (data, timeout = true) => {
    const token = localStorage.getItem("token");
    return axios.put(
      api,
      data,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      },
      timeout
    );
  };

const putWithHeader =
  (api) =>
  (data, timeout = true) => {
    const token = localStorage.getItem("token");
    return axios.put(
      api,
      data,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      timeout
    );
  };

export { postWithoutHeader, getWithHeader, postWithHeader, putUploadImage,putWithHeader };
