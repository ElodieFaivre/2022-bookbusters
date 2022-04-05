import * as React from 'react';

import Header from "../components/Header/Header";
import SignButtons from "../components/SignButtons/SignButtons";
import Books from '../components/Books/Books';


import '../styles/Home.scss'
import WelcomeBox from '../components/WelcomeBox/WelcomeBox';
import { Box } from '@mui/system';

const Home = () => {
    return (
        <>
            <Header />
            <WelcomeBox />
            <Books />
            <SignButtons />
        </>
    );
};

export default Home;
