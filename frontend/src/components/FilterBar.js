// FilterBar.js
import React from "react";
import languages from "./languages";

const FilterBar = ({
  title,
  setTitle,
  handleSearch,
  languageFilter,
  handleLanguageChange,
}) => {
  return (
    <div className="filter-bar">
      <div className="search-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter movie name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="language-filter">
        <label htmlFor="language">Language:</label>
        <select
          id="language"
          value={languageFilter}
          onChange={handleLanguageChange}
        >
          {Object.entries(languages).map(([name, code]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
