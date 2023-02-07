const handleGitHubLogin = async () => {
    try {
    const gitHubResponse = await axios.get(
    https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GITHUB_REDIRECT_URI}
    );
    const { access_token } = gitHubResponse.data;
    const gitHubUserResponse = await axios.get("https://api.github.com/user", {
    headers: {
    Authorization: Bearer ${access_token},
    },
    });
    const { name, email, avatar_url } = gitHubUserResponse.data;
    const decoded = {
    name,
    email,
    picture: avatar_url,
    };
    const doc = {
    _id: email,
    _type: "user",
    userName: name,
    userEmail: email,
    image: avatar_url,
    };
    localStorage.setItem("user", JSON.stringify(decoded));
    console.log(decoded);

    client.createIfNotExists(doc).then(() => {
        navigate("/", { replace: true });
});

} catch (error) {
    console.error(error);
    }
    };

    Este ejemplo usa Axios para realizar una petición GET a la API de GitHub y obtener la información del usuario. Luego, almacena la información decodificada en localStorage y crea un documento en el cliente con la misma estructura que el botón de inicio de sesión de Google. Finalmente, navega a