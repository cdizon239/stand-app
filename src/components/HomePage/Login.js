import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import './Login.css'

const clientId = process.env.REACT_APP_GCLIENT_ID;

const Login = () => {
  const navigate = useNavigate();
  const onSuccess = async (res) => {
    console.log(res.profileObj);
    const id_token = res.getAuthResponse().id_token;
    let login = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_token: id_token,
            email: res.profileObj.email
        }),
        credentials: 'include'
    })

    let loggedInUser = await login.json()
    if (loggedInUser.status === 200) {
      localStorage.setItem("loggedInUserName", loggedInUser.data.name)
      localStorage.setItem("loggedInUserEmail", loggedInUser.data.email)
      localStorage.setItem("loggedInUserAvatar", loggedInUser.data.img_url)
      localStorage.setItem("loggedInUserGID", loggedInUser.data.googleId)
    }

    navigate("/all_spaces");
  };

  //  clear local storage on mount
  useEffect(() => {
    if (localStorage.getItem('loggedInUserEmail')) {
      navigate("/all_spaces");
    }
  }, [])

  return (
    <div>
      <div className="login-wrapper">
        <Image src="/standAppLogo.svg" className="App-logo" style={{width: "60vh"}}/>
        <h1>StandUp</h1>
        <GoogleLogin
          className="login-button"
          clientId={clientId}
          buttonText="Login with your Google account"
          onSuccess={onSuccess}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
};

export default Login;
