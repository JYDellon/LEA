import {
  URL_BACK_POPULAR_PRODUCTS,
  URL_BACK_NEW_PRODUCTS
} from "../../constants/urls/urlBackEnd";
import apiBackEnd from "./api.Backend";

export function newProducts() {
  return apiBackEnd.get(URL_BACK_NEW_PRODUCTS);
}

export function popularProducts() {
  return apiBackEnd.get(URL_BACK_POPULAR_PRODUCTS);
}
  
