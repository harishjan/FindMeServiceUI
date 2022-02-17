import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:8098/api/user/";

const getUserInfo = async () => {
  return await axios.get(API_URL + "getUserInfo", { headers: authHeader() });
};

const getUserInquirySubmission = async () => {
  return await axios.get(API_URL + "getUserInquiriesSubmission", { headers: authHeader() });
};

const getUserInquiryReceived = async () => {
  return await axios.get(API_URL + "getUserInquiriesReceived", { headers: authHeader() });
};


export {
    getUserInfo,
    getUserInquirySubmission,
    getUserInquiryReceived
};