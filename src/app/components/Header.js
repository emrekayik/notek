"use client";
import React, { useContext } from "react";
import { ThemeContext } from "@/app/context/ThemeContext";

const Header = ({ title, children }) => {
  const { changeTheme } = useContext(ThemeContext);

  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        <div className="drawer drawer-end">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu menu-vertical p-4 w-80 min-h-full bg-base-200 text-base-content flex justify-between">
              <li>
                <details>
                  <summary>Tema</summary>
                  <ul className="p-2 bg-base-100 rounded">
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
              </li>
              {children}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <h1 className="text-xl">{title}</h1>
      </div>
      <div className="flex-1">
        <div className="relative">
          <input
            type="text"
            className="pl-10 pr-4 py-2 input w-full max-w-md rounded-lg bg-base-200"
            placeholder="Ara"
          />
          <div
            className="absolute inset-y-0 left-0 pl-3
                    flex items-center
                    pointer-events-none"
          >
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex-none"></div>
    </div>
  );
};

export default Header;
