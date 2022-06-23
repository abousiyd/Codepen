import React from "react";

const Skypack = () => {
  return (
    <div className="app">
      <h3>skypack </h3>
      <input
        type="search"
        placeholder="Search npm and add a package..."
      ></input>

      <div class="search-results">
        <p class="search-results-message"></p>
        <ul></ul>
      </div>
    </div>
  );
};

export default Skypack;
