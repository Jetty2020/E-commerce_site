import axios from 'axios';
import {
	UPLOAD_PRODUCT
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
