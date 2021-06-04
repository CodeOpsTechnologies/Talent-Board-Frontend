import rawAxios from "axios";
import {api} from "./axios.config";

const API_URL = api.apiUrl;
const GET_LOCATIONS = "/location"

// API to fetch states for India
export function getStates() {
	return rawAxios.get(API_URL + GET_LOCATIONS + `?country=India`);
}

// API to fetch cities for the states
export function getCities(state) {
	return rawAxios.get(API_URL + GET_LOCATIONS + `?state=${state}`);
}



