import axios from "axios";
import { api } from "./axios.config";

const API_URL = api.apiUrl;
const ADD_PROFILE = "/talent";
const GET_DATA = "/talent/profiles";
const FILTER_DATA = "/talent/filters"

// API to Create Profile
export function createProfile(
  name,
  skills,
  industry,
  jobRole,
  proficiencyLevel,
  visibilityDuration,
  experience,
  relocation,
  linkedinUrl,
  state,
  city,
  expiresAfter
) {
  const payload = {
    name,
    skills,
    industry,
    jobRole,
    proficiencyLevel,
    visibilityDuration,
    experience,
    relocation,
    linkedinUrl,
    state,
    city,
    expiresAfter
  };
  return axios.post(API_URL + ADD_PROFILE, payload);
}

// API to Fetch all profiles
export function getPofiles(limit, offset, searchTerm="", sort = "+name", finalArrayValue = {} ) {
  const payload = {
    limit: limit,
    offset: offset,
    searchTerm: searchTerm,
    sort: sort,
    filterBy: finalArrayValue
  };

  return axios.post(API_URL + GET_DATA, payload);
}

// API to get filters
export function getFitlers(){
  return axios.get(API_URL + FILTER_DATA )
}


