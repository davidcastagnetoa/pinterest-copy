import { useEffect, useState } from "react";
export default function useDarkSide() {
    const [theme, setTheme] = useState(localStorage.theme);
    const colorTheme = theme === 'dark' ? 'light' : 'dark';

    useEffect(() => {
      const root = window.document.documentElement;
      root.classList.remove(colorTheme);
      root.classList.add(theme);

      //Save theme to localstorage
      localStorage.setItem('theme', theme);
    }, [colorTheme, setTheme]);
    
    return [colorTheme, setTheme];
}