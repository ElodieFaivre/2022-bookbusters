import React from 'react';

const SearchBar = () => {
  return (
    <div className="form-component">
      <div className="form-container">
        <form>
          <input type="text" placeholder='Rechercher un livre' />
        </form>
      </div>
    </div>
  );
};

export default SearchBar;