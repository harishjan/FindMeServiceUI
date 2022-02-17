import axios from "axios";

const API_URL = "http://localhost:8098/api/skill/";

const searchSkills = async (searchQuery, mileRadius, userLat, userLong) => {
    return await axios.post(API_URL + "search", {
        searchQuery,
        mileRadius,
        userLat,
        userLong
      });  
};

export {
    searchSkills
};