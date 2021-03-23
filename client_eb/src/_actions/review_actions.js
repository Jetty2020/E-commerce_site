import axios from 'axios';
import {
	LOAD_REVIEW,
	ADD_REVIEW,
} from './types';
import { PRODUCT_SERVER } from '../components/Config.js';

export function loadReview(id){
	const request = axios.get(`${PRODUCT_SERVER}/loadReview/${id}`)
											.then(response => response.data);
	return {
		type: LOAD_REVIEW,
		payload: request
	};
};

export function addReview(id, dataToSubmit){
	const request = axios.post(`${PRODUCT_SERVER}/addReview/${id}`,dataToSubmit)
											.then(response => response.data);
	return {
		type: ADD_REVIEW,
		payload: request
	};
};