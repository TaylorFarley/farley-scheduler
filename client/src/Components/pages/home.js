import React, {useState, useEffect} from 'react';
import $ from 'jquery';
import Register from '../Register'
import Login from '../Login'
import Axios from 'axios'

const Home = (props) => {

const [userData, setUserData] = useState({token: '', user: ''});


const [LoginRegister, setLoginRegister] = useState('')

	useEffect(() => {
		let token = localStorage.getItem("auth-token");
		if(token){
			setLoginRegister(true)
		}
	  }, userData);

	

const RegisterFn = (register)=>{
	
	let {email, password} = register
	Axios
	.post("http://localhost:4000/users/register", register)
	.then((res) =>
	{
	  const loginRes = Axios.post("http://localhost:4000/users/login", {
		email,
		password,
	  }).then((res)=>{	
		setUserData({
		  ...userData,
		  token: res.data.token,
		  user: res.data.user.displayName,
		});

		localStorage.setItem("auth-token", res.data.token);
		setLoginRegister(true)
	  });
	 
	
	})
	.catch((error) => {
	  console.log(error);
	});
}

const LoginFn = (register)=>{
	
	let {email, password} = register
	
	  const loginRes = Axios.post("http://localhost:4000/users/login", {
		email,
		password,
	  }).then((res)=>{	
		setUserData({
		  ...userData,
		  token: res.data.token,
		  user: res.data.user.displayName,
		});

		localStorage.setItem("auth-token", res.data.token);
		setLoginRegister(true)
	  });
	 
	
	
}
const logout = () => {
    setUserData({
		...userData,
      token: undefined,
      user: undefined,
	});
	setLoginRegister(false)
    localStorage.setItem("auth-token", "");
  };

	
	  
	       
    return (
      

<div id="wrapper">

				
<nav id="nav">
	<a href="#" class="icon solid fa-home"><span>Home</span></a>
	<a href="#work" class="icon solid fa-address-card"><span>Login</span></a>
	<a href="#contact" class="icon solid fa-envelope"><span>Contact</span></a>
	<a href="https://twitter.com/taylorwfarley" class="icon brands fa-twitter"><span>Twitter</span></a>
</nav>


<div id="main">


		<article id="home" class="panel intro">
			<header>
				<h1>Jane Doe</h1>
				<p>Senior Astral Projectionist</p>
			</header>
			<a href="#work" class="jumplink pic">
				<span class="arrow icon solid fa-chevron-right"><span>See my work</span></span>
				<img src="images/me.jpg" alt="" />
			</a>
		</article>

	
		<article id="work" class="panel">
			<header>
				
			</header>
			<p>
	{LoginRegister?(
	
	<button onClick={logout}>Log out</button>
	
	):(<Login LoginFn={LoginFn} RegisterFn={RegisterFn} />)}
	
							</p>
			<section>
				<div class="row">
					<div class="col-4 col-6-medium col-12-small">
					
					</div>
					<div class="col-4 col-6-medium col-12-small">
						
					</div>
					<div class="col-4 col-6-medium col-12-small">
						
					</div>
					<div class="col-4 col-6-medium col-12-small">
					
					</div>
					<div class="col-4 col-6-medium col-12-small">
						
					</div>
					<div class="col-4 col-6-medium col-12-small">
						
					</div>
					<div class="col-4 col-6-medium col-12-small">
					
					</div>
					<div class="col-4 col-6-medium col-12-small">
					
					</div>
					<div class="col-4 col-6-medium col-12-small">
						
					</div>
					<div class="col-4 col-6-medium col-12-small">
					
					</div>
					<div class="col-4 col-6-medium col-12-small">
						
					</div>
					<div class="col-4 col-6-medium col-12-small">
						
					</div>
				</div>
			</section>
		</article>


		<article id="contact" class="panel">
			<header>
				<h2>Contact Me</h2>
			</header>
			<form action="#" method="post">
				<div>
					<div class="row">
						<div class="col-6 col-12-medium">
							<input type="text" name="name" placeholder="Name" />
						</div>
						<div class="col-6 col-12-medium">
							<input type="text" name="email" placeholder="Email" />
						</div>
						<div class="col-12">
							<input type="text" name="subject" placeholder="Subject" />
						</div>
						<div class="col-12">
							<textarea name="message" placeholder="Message" rows="6"></textarea>
						</div>
						<div class="col-12">
							<input type="submit" value="Send Message" />
						</div>
					</div>
				</div>
			</form>
		</article>

</div>


<div id="footer">
	<ul class="copyright">
		<li>&copy; Untitled.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
	</ul>
</div>

</div>
         
    );
};

export default Home;