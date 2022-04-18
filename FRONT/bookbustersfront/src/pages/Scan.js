import { Box } from '@mui/system';

import React from 'react';
import Header from '../components/Header/Header';

import Scanner from '../components/Scan/Scan';

import BookDetailModal from '../components/BookDetailModal/BookDetailModal';

import SearchBar from '../components/SearchBar/SearchBar';

const Scan = () => {
    return (
        <>
            <Header />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexFlow: 'column wrap',
                    textAlign: 'center',
                    mt: 4,
                }}
            >
                <Scanner />
            </Box>
            <Box>
                <SearchBar />
            </Box>
            <BookDetailModal />
        </>
    );
};

export default Scan;
