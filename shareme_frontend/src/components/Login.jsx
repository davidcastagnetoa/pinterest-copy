import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import OAuth2 from "client-oauth2";
import { useNavigate } from "react-router-dom";
import shareVideo from "../assets/share.mp4";
import logoSVG from "../assets/AbigaelLogo.png";
import { client } from "../client";
import jwt_decode from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();

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
  const handleGitHubLogin = async () => {
    const githubAuth = new OAuth2({
      clientId: process.env.REACT_APP_GITHUB_API_CLIENT_ID,
      clientSecret: process.env.REACT_APP_GITHUB_API_CLIENT_SECRET,
      accessTokenUri: "https://github.com/login/oauth/access_token",
      authorizationUri: "https://github.com/login/oauth/authorize",
      redirectUri: process.env.REACT_APP_GITHUB_API_REDIRECT_URI,
      scopes: ["user:email"],
    });
    try {
      const result = await githubAuth.code.getToken(window.location.href);
      const { accessToken, user } = result;
      const { login, email, name, avatar_url } = user;

      const doc = {
        _id: login,
        _type: "user",
        userName: name,
        userEmail: email,
        image: avatar_url,
      };

      localStorage.setItem("user", JSON.stringify({ accessToken, user }));

      client.createIfNotExists(doc).then(() => {
        navigate("/", { replace: true });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleGuest = () => {
    // set guest user
    const { setGuest: setGuestStatus, guest } = this.props;
    setGuestStatus("/auth/guest");
    guest(); // callback to hid login div
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
            {/* Google Login Button */}
            <GoogleOAuthProvider
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
            >
              <div>
                <GoogleLogin
                  onSuccess={responseGoogle}
                  onError={responseGoogle}
                />
              </div>
            </GoogleOAuthProvider>
          </div>
          {/* Github Login Button */}
          <div className="shadow-2xl">
            <button onClick={handleGitHubLogin}>Login with GitHub</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// https://levelup.gitconnected.com/-to-implement-login-with-github-in-a-react-app-bd3d704c64fc
