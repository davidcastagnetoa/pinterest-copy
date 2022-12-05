import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./container/Home";
import { MyEstadoGlobalContext } from "./components/MyEstadoGlobalContext";

const App = () => {
<<<<<<< Updated upstream
=======
  const [popup, setPopup] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user =
      localStorage.getItem("user") !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : localStorage.clear();
    // console.log(user)
    if (!user) navigate("/login");
  }, []);

>>>>>>> Stashed changes
  return (
    <MyEstadoGlobalContext.Provider value={{ popup, setPopup }}>
      <Routes>
        <Route path="login/" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </MyEstadoGlobalContext.Provider>
  );
};

export default App;
