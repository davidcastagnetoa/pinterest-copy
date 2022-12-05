import React from "react";
const MyEstadoGlobalContext = React.createContext({
  popup: false,
  setPopup: () => {},
});
export { MyEstadoGlobalContext };
