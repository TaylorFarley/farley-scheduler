import React, { useState, useEffect } from "react";
import $ from "jquery";
import Register from "../Register";
import Login from "../Login";
import Axios from "axios";
import Calendar from "../Calendar";
const Home = (props) => {
  const [userData, setUserData] = useState({ token: "", user: "" });

  const [LoginRegister, setLoginRegister] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("auth-token");
    if (token) {
      setLoginRegister(true);
    }
  }, userData);

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
      setUserData({
        ...userData,
        token: res.data.token,
        user: res.data.user.displayName,
      });

      localStorage.setItem("auth-token", res.data.token);
      setLoginRegister(true);
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
          <header>
            {LoginRegister ? (
              <button onClick={logout}>Log out</button>
            ) : (
              <Login LoginFn={LoginFn} RegisterFn={RegisterFn} />
            )}
          </header>
        </article>

        <article id="work" className="panel">
          <header></header>
          <p>
            <Calendar userData={props.userData}/>
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
