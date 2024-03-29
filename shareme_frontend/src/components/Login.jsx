import React, { useEffect, useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import shareVideo from "../assets/share.mp4";
import logoSVG from "../assets/AbigaelLogo.png";
import { client } from "../client";
import jwt_decode from "jwt-decode";
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  // GOOGLE LOGIN
  const responseGoogle = (response) => {
    const decoded = jwt_decode(response.credential);
    const { name, picture, sub, email } = decoded;
    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      userEmail: email,
      image: picture,
    };
    localStorage.setItem("user", JSON.stringify(decoded));
    console.log(decoded);

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  // GITHUB LOGIN
  // const CLIENT_ID = "87b5af1de0898005ef63";
  // const CLIENT_SECRET = "44f1c85369940531869ec11f059105c202de4a0e";
  // const REDIRECT_URI =
  //   "https://davidcastagnetoa-vigilant-space-goggles-v5p4gwwg5gw2x495-3000.preview.app.github.dev/";
  // const AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;

  // const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const code = urlParams.get("code");
  //     if (code) {
  //         handleTokenExchange(code);
  //     }
  // }, []);

  // const handleTokenExchange = async (code) => {
  //   try {
  //     const response = await fetch(
  //       `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     if (data.access_token) {
  //       // Store token in local storage
  //       localStorage.setItem("access_token", data.access_token);
  //       // Fetch user data
  //       const userResponse = await fetch("https://api.github.com/user", {
  //         headers: {
  //           Authorization: `token ${data.access_token}`,
  //         },
  //       });
  //       const userData = await userResponse.json();
  //       console.log(userData);
  //       // Store user data in local storage
  //       localStorage.setItem("user", JSON.stringify(userData));
  //       // Set logged in status
  //       setLoggedIn(true);
  //       // Redirect to home page
  //       navigate("/", { replace: true });
  //     } else {
  //       console.error(data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

//   const handleGithubAuth = (authToken) => {
//     const decodedToken = jwt_decode(authToken);
//     const { name, picture, sub, email } = decodedToken;
//     const doc = { name, picture, sub, email };
//     localStorage.setItem("githubAuthData", JSON.stringify(doc));
//     console.log(decodedToken);
//   };

  // const handleGithubAuth = async (response) => {
  //   const { data } = await axios.post("/api/auth/github", {
  //     code: response.code,
  //   });
  //   const { access_token } = data;
  //   const userResponse = await axios.get("https://api.github.com/user", {
  //     headers: { Authorization: `Bearer ${access_token}` },
  //   });
  //   const { name, picture, sub, email } = jwt_decode(access_token);
  //   const doc = { name, picture, sub, email };
  //   localStorage.setItem("user", JSON.stringify(doc));
  // };

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

          <div className="shadow-2xl p-0 mb-2">
            {/* Google Login Button */}
            <GoogleOAuthProvider
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
            >
              <GoogleLogin
                onSuccess={responseGoogle}
                onError={responseGoogle}
                theme="filled_black"
                width="230"
              />
            </GoogleOAuthProvider>
          </div>
          {/* Github Login Button */}
          <div className="shadow-2xl">
            <button
              type="button"
              // onClick={handleGithubAuth}
              className="text-white w-[230px] bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-md text-sm px-5 py-2.5 text-center justify-between inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30"
            >
              <svg
                className="w-4 h-4 mr-2 -ml-1"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="github"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512"
              >
                <path
                  fill="currentColor"
                  d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                ></path>
              </svg>
              Inicia sesion con GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// const handleGithubAuth = (authToken) => {
//   const decodedToken = jwt_decode(authToken);
//   const { name, picture, sub, email } = decodedToken;
//   const doc = { name, picture, sub, email };
//   localStorage.setItem("githubAuthData", JSON.stringify(doc));
// };
