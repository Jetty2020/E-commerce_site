import axios from 'axios';
import {
	UPLOAD_PRODUCT,
	EDIT_PRODUCT,
	SEARCH_PRODUCT,
	PRODUCT_DETAIL,
	LOAD_PRODUCT,
	DELETE_PRODUCT,
} from './types';
import { PRODUCT_SERVER } from '../components/Config.js';

export function productDetail(dataToSubmit){
	const request = axios.post(`${PRODUCT_SERVER}/productDetail`,dataToSubmit)
											.then(response => response.data);
	return {
		type: PRODUCT_DETAIL,
		payload: request
	};
};

export function uploadProduct(dataToSubmit){
	const request = axios.post(`${PRODUCT_SERVER}/upload`,dataToSubmit)
											.then(response => response.data);
	return {
		type: UPLOAD_PRODUCT,
		payload: request
	};
};

export function editProduct(dataToSubmit){
	const request = axios.post(`${PRODUCT_SERVER}/edit`,dataToSubmit)
											.then(response => response.data);
	return {
		type: EDIT_PRODUCT,
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

export function loadProduct(sector){
	const request = axios.get(`${PRODUCT_SERVER}/load/${sector}`)
											.then(response => response.data);
	return {
		type: LOAD_PRODUCT,
		payload: request
	};
};

export function deleteProduct(productID){
	const request = axios.get(`${PRODUCT_SERVER}/delete/${productID}`)
											.then(response => response.data);
	return {
		type: DELETE_PRODUCT,
		payload: request
	};
};
