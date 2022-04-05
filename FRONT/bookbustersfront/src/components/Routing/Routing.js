import React from 'react'

//* Import des composants nécessaires à React Router
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from "../../pages/Home";
import Error from "../../pages/Error";
import Account from "../../pages/Account"
import Credits from "../../pages/Credits"
import Favorites  from "../../pages/Favorites"
import LegalNotice from "../../pages/LegalNotice"
import Library from "../../pages/Library"
import Contact from "../../pages/Contact"
import MyAlerts from "../../pages/MyAlerts"
import SignInSide from "../../pages/SignIn";
import SignUp from '../../pages/SignUp';

function Routing() {
  return (
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="*" element={<Error />}/>
                <Route path="/Account" element={<Account />}/>
                <Route path="/SignIn" element={<SignInSide />}/>
                <Route path="/SignUp" element={<SignUp />}/>
                <Route path="/Credits" element={<Credits />}/>
                <Route path="/Favorites" element={<Favorites />}/>
                <Route path="/LegalNotice" element={<LegalNotice />}/>
                <Route path="/Library" element={<Library />}/>
                <Route path="/Contact" element={<Contact />}/>
                <Route path="/myAlerts" element={<MyAlerts />}/>
            </Routes>
    </BrowserRouter>
  )
}

export default Routing
