import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:8099/api/user/";

const getUserDetails = () => {
  return axios.get(API_URL + "userDetails", { headers: authHeader() });
};

const getUserInquirySubmission = () => {
  return axios.get(API_URL + "getUserInquiriesSubmission", { headers: authHeader() });
};

const getUserInquiryReceived = () => {
  return axios.get(API_URL + "getUserInquiryReceived", { headers: authHeader() });
};


export {
    getUserDetails,
    getUserInquirySubmission,
    getUserInquiryReceived
};