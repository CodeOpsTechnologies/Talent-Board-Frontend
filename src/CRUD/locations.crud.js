import rawAxios from "axios";
import {api} from "./axios.config";

const API_URL = api.apiUrl;
const GET_LOCATIONS = "/location"


export function getStates() {
	return rawAxios.get(API_URL + GET_LOCATIONS + `?country=India`);
}

export function getCities(state) {
	return rawAxios.get(API_URL + GET_LOCATIONS + `?state=${state}`);
}
