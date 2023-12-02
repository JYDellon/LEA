import { URL_BACK_NEWSLETTER } from '../../constants/urls/urlBackEnd';
import apiBackEnd from './api.Backend';

export function newsletterSubscription(values) {
    return apiBackEnd.post(URL_BACK_NEWSLETTER, values);
}
