import React from "react";
import "./ReactTableSearchBar.css";

export default function ReactTableSearchBar(props) {
  const [search, setSearch] = React.useState(props.search);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = (e) => {
    props.onSearch(search);
  };

  return (
    <div className="react-table-searchbar">
      <input
        placeholder={props.placeholder}
        value={search}
        onChange={handleChange}
        onKeyUp={({ key }) => {
          if (key === "Enter") handleClick();
        }}
      />
      <button type="button" onClick={handleClick}>
        <i class="fas fa-search"></i>
      </button>
    </div>
  );
}
