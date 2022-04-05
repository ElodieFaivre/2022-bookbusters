import * as React from 'react';

import Header from "../components/Header/Header";
import SignButtons from "../components/SignButtons/SignButtons";
import Book from '../components/Book/Book';

import '../styles/Home.scss'

const Home = () => {
    return (
        <>
            <Header />
            <Book />
            <SignButtons />
        </>
    );
};

export default Home;
