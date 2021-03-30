import axios from 'axios';
import {
	LOAD_QNA,
	ADD_QNA,
} from './types';
import { PRODUCT_SERVER } from '../components/Config.js';

export function loadQnA(id){
	const request = axios.get(`${PRODUCT_SERVER}/loadQnA/${id}`)
											.then(response => response.data);
	return {
		type: LOAD_QNA,
		payload: request
	};
};

export function addQnA(id, dataToSubmit){
	const request = axios.post(`${PRODUCT_SERVER}/addQnA/${id}`,dataToSubmit)
											.then(response => response.data);
	return {
		type: ADD_QNA,
		payload: request
	};
};