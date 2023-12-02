import * as URL from "../../constants/urls/urlBackEnd";
import apiBackEnd from "./api.Backend";

export function authenticate(values) {
  return apiBackEnd.post(URL.URL_BACK_AUTHENTICATE, values);
}

export function registration(values) {
  return apiBackEnd.post(URL.URL_BACK_REGISTRATION, values);
}

export function forgotPassword(values) {
  return apiBackEnd.post(URL.URL_BACK_FORGOT_PASSWORD, values);
}

export function modifyAccount(values) {
  return apiBackEnd.put(URL.URL_BACK_MODIFY_ACCOUNT, values);
}
