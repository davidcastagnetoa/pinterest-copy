import React from "react";
import ClientOAuth2 from "client-oauth2";
import { useNavigate } from "react-router-dom";
import shareVideo from "../assets/share.mp4";
import logoSVG from "../assets/AbigaelLogo.png";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  const handleGithub = async () => {
    const githubAuth = new ClientOAuth2({
      clientId: process.env.REACT_APP_GITHUB_API_CLIENT_ID,
      clientSecret: process.env.REACT_APP_GITHUB_API_CLIENT_SECRET,
      accessTokenUri: 'https://github.com/login/oauth/access_token',
      authorizationUri: 'https://github.com/login/oauth/authorize',
      redirectUri: process.env.REACT_APP_GITHUB_API_REDIRECT_URI,
      scopes: ['user:email']
    });
  
    const token = await githubAuth.owner.getToken(/* options */);

    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${token.accessToken}`
      }
    });

    const githubUser = await response.json();
    const { id, name, email, avatar_url } = githubUser;

    const doc = {
      _id: id,
      _type: 'user',
      userName: name,
      userEmail: email,
      image: avatar_url
    }

    localStorage.setItem('user', JSON.stringify(githubUser));

    client.createIfNotExists(doc)
      .then(() => {
        navigate('/', { replace: true })
      })
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logoSVG} width="200px" alt="logo" />
          </div>

          <div className="shadow-2xl">
            <button onClick={handleGithub}>
              Login with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
