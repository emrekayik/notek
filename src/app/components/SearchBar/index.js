import React from "react";

import { SearchIcon } from "@/app/utils/icons";

const SearchBar = ({ searchTerm, onSearchTermChange }) => {
  return (
    <label className="input input-bordered flex items-center gap-2">
      <SearchIcon />
      <input
        type="text"
        className=" grow"
        placeholder="Ara"
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
      />
    </label>
  );
};

export default SearchBar;
