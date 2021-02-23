import axios from 'axios';
import {
	UPLOAD_ITEM
} from './_types';
import { ITEM_SERVER } from '../components/Config.js';

export function uploadItem(dataToSubmit){
	const request = axios.post(`${ITEM_SERVER}/upload`,dataToSubmit)
											.then(response => response.data);
	return {
		type: UPLOAD_ITEM,
		payload: request
	};
};
