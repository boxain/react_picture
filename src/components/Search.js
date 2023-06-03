import React from "react";

const Search = ({ search, setInput }) => {
  const handleTextOnChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="search">
      <input type="text" className="input" onChange={handleTextOnChange} />
      <button onClick={search}>Search</button>
    </div>
  );
};

export default Search;
