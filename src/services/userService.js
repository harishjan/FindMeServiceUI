import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:8098/api/user/";

const getUserInfo = async () => {
  return await axios.get(API_URL + "getUserInfo", { headers: authHeader() });
};

const sendWorkInquiry = async (workStartDate, workEndDate, helpFinderUserId, workerUserId, workDescription, distanceFoundAwayfrom) => { 
  return await axios.post(API_URL + "sendWorkInquiry", {
    workStartDate, workEndDate, helpFinderUserId, workerUserId, workDescription, distanceFoundAwayfrom    
  } ,{ headers: authHeader() });
};


const hireInquiry = async (inquiryId) => {
  return await axios.post(API_URL + "hireInquiry/?inquiryId=" + inquiryId, {}, { headers: authHeader() });
};


const commitInquiry = async (inquiryId) => {
  return await axios.post(API_URL + "commitInquiry/?inquiryId=" + inquiryId, {},{ headers: authHeader() });
};

const cancelInquiry = async (inquiryId) => {
  return await axios.post(API_URL + "cancelInquiry/?inquiryId=" + inquiryId, {},{ headers: authHeader() });
};

const getReceivedWorkInquiry = async () => {

  return await axios.get(API_URL + "getReceivedWorkInquiry", { headers: authHeader() });
};

const getInquiriesSent = async () => {

  return await axios.get(API_URL + "getInquiriesSent", { headers: authHeader() });
};




export {
    getUserInfo,
    sendWorkInquiry,
    hireInquiry,
    commitInquiry,
    cancelInquiry,
    getReceivedWorkInquiry,
    getInquiriesSent
};