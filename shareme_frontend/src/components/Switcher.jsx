import React, { useState } from "react";
import useDarkSide from "./hook/DarkSide";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function Switcher() {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toogleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <>
      <div className="w-11 h-11 text-gray-500 hover:text-gray-100 border-gray-500 border font-medium rounded-full      text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 p-2.5">
        <DarkModeSwitch
          checked={darkSide}
          size={20}
          onChange={toogleDarkMode}
        />
      </div>
    </>
  );
}
