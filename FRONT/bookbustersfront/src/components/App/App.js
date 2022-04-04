import "./style.scss";
import "../BurgerMenu/BurgerMenu.scss";

import {BrowserRouter, Routes, Route} from "react-router-dom"

import Home from "../../pages/Home";
import Error from "../../pages/Error";
import Account from "../../pages/Account"
import Credits from "../../pages/Credits"
import Favorites  from "../../pages/Favorites"
import LegalNotice from "../../pages/LegalNotice"
import Library from "../../pages/Library"
import Contact from "../../pages/Contact"

function App() {
  return (
    <BrowserRouter>
      <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="*" element={<Error />}/>
            <Route path="/Account" element={<Account />}/>
            <Route path="/Credits" element={<Credits />}/>
            <Route path="/Favorites" element={<Favorites />}/>
            <Route path="/LegalNotice" element={<LegalNotice />}/>
            <Route path="/Library" element={<Library />}/>
            <Route path="/Contact" element={<Contact />}/>
      </Routes>
   </BrowserRouter>
  );
}

export default App;
