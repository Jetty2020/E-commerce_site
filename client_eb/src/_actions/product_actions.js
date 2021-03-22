import axios from 'axios';
import {
	UPLOAD_PRODUCT,
	SEARCH_PRODUCT,
	PRODUCT_DETAIL,
} from './types';
import { PRODUCT_SERVER } from '../components/Config.js';

export function uploadProduct(dataToSubmit){
	const request = axios.post(`${PRODUCT_SERVER}/upload`,dataToSubmit)
											.then(response => response.data);
	return {
		type: UPLOAD_PRODUCT,
		payload: request
	};
};

export function searchProduct(dataToSubmit){
	const request = axios.post(`${PRODUCT_SERVER}/search`,dataToSubmit)
											.then(response => response.data);
	return {
		type: SEARCH_PRODUCT,
		payload: request
	};
};

export function productDetail(dataToSubmit){
	const request = axios.post(`${PRODUCT_SERVER}/productDetail`,dataToSubmit)
											.then(response => response.data);
	return {
		type: PRODUCT_DETAIL,
		payload: request
	};
};
