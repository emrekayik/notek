// Header'daki tema seçme componenti

import React, { useContext } from "react";
import { ThemeContext } from "@/app/context/ThemeContext";

const ThemeSwitcher = () => {
  const { changeTheme } = useContext(ThemeContext);
  return (
    <details>
      <summary>Tema</summary>
      <ul className="rounded bg-base-100 p-2">
        <li>
          <a onClick={() => changeTheme("light")}>Light</a>
        </li>
        <li>
          <a onClick={() => changeTheme("dark")}>Dark</a>
        </li>
        <li>
          <a onClick={() => changeTheme("cupcake")}>Kapkek</a>
        </li>
        <li>
          <a onClick={() => changeTheme("synthwave")}>Synthwave</a>
        </li>
      </ul>
    </details>
  );
};

export default ThemeSwitcher;
