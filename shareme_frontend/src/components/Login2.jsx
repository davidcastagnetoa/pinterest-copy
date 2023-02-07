import React from "react";
import { GithubOAuthProvider, GithubLogin } from "@react-oauth/github";
import jwt_decode from "jwt-decode";
import { client } from "../client";

// ... other imports ...

const Login = () => {
  // ... other code ...

  // GITHUB LOGIN
  const responseGithub = (response) => {
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

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      {/* ... other code ... */}

      <GithubOAuthProvider
        clientId={process.env.REACT_APP_GITHUB_API_TOKEN}
        redirectUri={process.env.REACT_APP_GITHUB_REDIRECT_URI}
      >
        <GithubLogin onSuccess={responseGithub} onError={responseGithub} />
      </GithubOAuthProvider>

      {/* ... other code ... */}
    </div>
  );
};

export default Login;
