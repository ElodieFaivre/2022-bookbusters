import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./SearchBar.style";
// import { searchBooks } from "../../api/fetchApi";
import { useNavigate } from "react-router-dom";
import { searchBooks } from "../../api/fetchApi";

//* Fin des styles pour la searchBar

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    searchBooks();
  };

  return (
    <Search component="form" onSubmit={handleSubmitSearch}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Recherchez des livres"
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
    </Search>
  );
};

export default SearchBar;
