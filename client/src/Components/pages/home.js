import React, { useState, useEffect } from "react";
import $ from "jquery";

import Login from "../Login";
import Axios from "axios";
import Calendar from "../Calendar";
const Home = (props) => {
  

  const [LoginRegister, setLoginRegister] = useState(false);
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
        setLoginRegister(true)
      }
    };

    checkLoggedIn();
  },[]);

 
  
  const RegisterFn = (register) => {
    let { email, password } = register;
    Axios.post("http://localhost:4000/users/register", register)
      .then((res) => {
        const loginRes = Axios.post("http://localhost:4000/users/login", {
          email,
          password,
        }).then((res) => {
          setUserData({
            ...userData,
            token: res.data.token,
            user: res.data.user.displayName,
          });

          localStorage.setItem("auth-token", res.data.token);
          setLoginRegister(true);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const LoginFn = (register) => {
    let { email, password } = register;

    const loginRes = Axios.post("http://localhost:4000/users/login", {
      email,
      password,
    }).then((res) => {    
      console.log(res.data.user.displayName)
      localStorage.setItem("auth-token", res.data.token);
      setLoginRegister(true);
      setUserData({
        ...userData,
        token: res.data.token,
        user: res.data.user.displayName,
      });
     
    });
  };
  const logout = () => {
    setUserData({
      ...userData,
      token: undefined,
      user: undefined,
    });
    setLoginRegister(false);
    localStorage.setItem("auth-token", "");
  };



  return (
    <div id="wrapper">
      <nav id="nav">
        <a href="#" className="icon solid fa-home">
          <span>Home</span>
        </a>
        <a href="#work" className="icon solid fa-book-open">
          <span>Book</span>
        </a>
        <a href="#contact" className="icon solid fa-envelope">
          <span>Contact</span>
        </a>
        <a
          href="https://twitter.com/taylorwfarley"
          className="icon brands fa-twitter"
        >
          <span>Twitter</span>
        </a>
      </nav>

      <div id="main">
        <article id="home" className="panel">
        
            {LoginRegister ? (
              <>
               {/* {getSchedule()} */}
              <button onClick={logout} >Log out</button><br></br>
              <button onClick={()=>{
                
                let uid = userData.user.id
                console.log(`sending ${uid}`)
                const makeApt = Axios.post("http://localhost:4000/schedules/getschedule", {
                  uid
                }).then((res) => {
                    console.log('coming back now')
                  console.log(res.data);
                });
               }}>Console Log Data</button>
             </>
            ) : (
              <Login LoginFn={LoginFn} RegisterFn={RegisterFn} />
            )}
        
        </article>

        <article id="work" className="panel">
          <header></header>
          <p>
            <Calendar userData={userData}/>
          </p>
          <section>
            <div className="row">
              <div className="col-4 col-6-medium col-12-small"></div>
              <div className="col-4 col-6-medium col-12-small"></div>
              <div className="col-4 col-6-medium col-12-small"></div>
              <div className="col-4 col-6-medium col-12-small"></div>
              <div className="col-4 col-6-medium col-12-small"></div>
              <div className="col-4 col-6-medium col-12-small"></div>
              <div className="col-4 col-6-medium col-12-small"></div>
              <div className="col-4 col-6-medium col-12-small"></div>
              <div className="col-4 col-6-medium col-12-small"></div>
              <div className="col-4 col-6-medium col-12-small"></div>
              <div className="col-4 col-6-medium col-12-small"></div>
              <div className="col-4 col-6-medium col-12-small"></div>
            </div>
          </section>
        </article>

        <article id="contact" className="panel">
          <header>
            <h2>Contact Me</h2>
          </header>
          <form action="#" method="post">
            <div>
              <div className="row">
                <div className="col-6 col-12-medium">
                  <input type="text" name="name" placeholder="Name" />
                </div>
                <div className="col-6 col-12-medium">
                  <input type="text" name="email" placeholder="Email" />
                </div>
                <div className="col-12">
                  <input type="text" name="subject" placeholder="Subject" />
                </div>
                <div className="col-12">
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows="6"
                  ></textarea>
                </div>
                <div className="col-12">
                  <input type="submit" value="Send Message" />
                </div>
              </div>
            </div>
          </form>
        </article>
      </div>

      <div id="footer">
        <ul className="copyright">
          <li>&copy; Untitled.</li>
          <li>
            Design: <a href="http://html5up.net">HTML5 UP</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
