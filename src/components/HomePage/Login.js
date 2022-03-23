import React from "react";
import { FormInput } from "semantic-ui-react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";

const clientId = process.env.REACT_APP_GCLIENT_ID;

const Login = () => {
  const navigate = useNavigate();
  const onSuccess = async (res) => {
    console.log(res.profileObj);
    const id_token = res.getAuthResponse().id_token;
    console.log(id_token);
    // let login = await fetch(process.env.REACT_APP_BACKEND_URL + '/sessions/signIn', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         id_token: id_token
    //     }),
    //     credentials: 'include'
    // })
    // console.log(await login.json());
    navigate("/all_spaces");
  };
  return (
    <div>
      <div className="LoginWrapper">
        <GoogleLogin
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
