"use client";

import React from "react";

import SearchBar from "@/app/components/SearchBar";
import ThemeSwitcher from "@/app/components/ThemeSwitcher";

import { GithubIcon } from "@/app/utils/icons";

const Header = ({
  children,
  title = "notek v2.0",
  searchTerm,
  onSearchTermChange,
  search = true,
}) => {
  return (
    <div className="navbar bg-base-100 sm:px-12">
      <div className="flex-none">
        <div className="drawer drawer-end z-50">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current"
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
            <ul className="menu menu-vertical flex min-h-full w-80 justify-between bg-base-200 p-4 text-base-content">
              <li>
                <ThemeSwitcher />
              </li>
              <li className="space-y-3">
                {children}
                <a
                  className="btn flex justify-evenly shadow-2xl"
                  href="https://github.com/emrekayik/notek.git"
                >
                  <GithubIcon />
                  GitHub'da Görüntüle
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <a href="/" className="flex-1 text-xl">
        {title}
      </a>
      {search && (
        <div className="flex-1">
          <SearchBar
            searchTerm={searchTerm}
            onSearchTermChange={onSearchTermChange}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
