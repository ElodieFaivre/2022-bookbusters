import React, { useState, useContext} from "react";
import FlipIcon from "@mui/icons-material/Flip";
import { Search, SearchIconWrapper, StyledInputBase } from "./SearchISBNBar.style";
import { searchBookByISBN } from '../../api/fetchApi';
import bookContext from '../../contexts/BookContext';
import { Typography } from "@mui/material";

const SearchISBNBar = () => {
  const [isbn, setIsbn] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { setOpenedBook } = useContext(bookContext);

  const handleSubmitSearch = async (event) => {
    event.preventDefault();
    const response = await searchBookByISBN(isbn);
    setOpenedBook(response.data);
    setErrMsg("");
  };

  return (
      <Search
          component='form'
          onSubmit={handleSubmitSearch}
          sx={{
              width: '100% !important',
              maxWidth: '600px',
              marginLeft: '0 !important',
              textAlign: 'left',
          }}
      >
          <SearchIconWrapper>
              <FlipIcon />
          </SearchIconWrapper>
          {errMsg && (
              <Typography variant='body2s' color='error' sx={{ mt: 2 }}>
                  {errMsg}
              </Typography>
          )}
          <StyledInputBase
              placeholder="Saisissez l'ISBN de votre livre"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setIsbn(e.target.value)}
              value={isbn}
              sx={{
                  width: '100% !important',
              }}
          />
      </Search>
  );
};

export default SearchISBNBar;
