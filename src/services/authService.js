import axios from "axios";

const API_URL = "http://localhost:8098/api/auth/";

const registerHelpFinderUSer = async (email, password, firstName, lastName, address) => {
  return await axios.post(API_URL + "signup", {
    email,
    password,
    firstName,
    lastName,
    address
  });
};


const registerAsWorker = async (email, password, firstName, lastName, address, userDescription, skills) => {
    return await axios.post(API_URL + "signup/registerWorker", {
      email,
    password,
    firstName,
    lastName,
    address,
    userDescription,
    skills
    });
  };

const signin = async (email, password) => {
  const response = await axios
    .post(API_URL + "signin", {
      email,
      password,
    });
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

export {
  registerHelpFinderUSer,
  signin,
  registerAsWorker,
  logout,
};
