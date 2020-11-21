

import React, { useState, useEffect} from 'react'
import Home from './Components/pages/home'
import Axios from "axios";  
function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });


  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:4000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:4000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);
  console.log(userData)

  return (
    <React.Fragment>
      <Home/>
      </React.Fragment>
      

   
  );
}

export default App;
