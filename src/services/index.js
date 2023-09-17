import {
  getWithHeader,
  postWithHeader,
  postWithoutHeader,
  putUploadImage,
  putWithHeader,
} from "./config";

const api = "https://take-home-test-api.nutech-integrasi.app";

export const register = postWithoutHeader(`${api}/registration`);
export const login = postWithoutHeader(`${api}/login`);
export const getUserData = getWithHeader(`${api}/profile`);
export const getTransaction = getWithHeader(`${api}/transaction/history`);
export const getBalance = getWithHeader(`${api}/balance`);
export const getServices = getWithHeader(`${api}/services`);
export const getBanner = getWithHeader(`${api}/banner`);
export const postTopup = postWithHeader(`${api}/topup`);
export const postTransaction = postWithHeader(`${api}/transaction`);
export const putImageUpload = putUploadImage(`${api}/profile/image`);
export const putUpdateUser = putWithHeader(`${api}/profile/update`);
