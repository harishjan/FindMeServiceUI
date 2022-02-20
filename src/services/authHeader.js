export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));    
    if (user && user.accessToken) {      
      return { Authorization: "Bearer " + user.accessToken,
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS', 'Accept': 'application/json'   };  
      
    } else {
      return {};
    }
  }
  