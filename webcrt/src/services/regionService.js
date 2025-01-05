import axios from "axios";
import { API_URLS } from "../constants/apiConstants";

export const fetchStates = async (country) => {
  const response = await axios.post(API_URLS.FETCH_STATES, { country });
  return response?.data?.data?.states || [];
};