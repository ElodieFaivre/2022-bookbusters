import { Box } from '@mui/system';

import React, { useState, useContext } from 'react';
import Header from '../components/Header/Header';

import Scanner from '../components/Scan/Scan';
import BookDetailModal from '../components/BookDetailModal/BookDetailModal';
import SearchISBNBar from '../components/SearchISBNBar/SearchISBNBar';

const ScanPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                <Box>
                    <Scanner
                        isModalOpen={isModalOpen}
                        onResolve={() => setIsModalOpen(true)}
                    />
                </Box>
                <br />
                <Box
                    sx={{
                        border: '2px solid red',
                        width: '600px',
                    }}
                >
                    <SearchISBNBar />
                </Box>
            </Box>

            {isModalOpen && (
                <BookDetailModal callback={() => setIsModalOpen(false)} />
            )}
        </>
    );
};

export default ScanPage;
