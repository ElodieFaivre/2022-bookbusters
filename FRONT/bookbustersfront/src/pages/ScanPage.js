import { Box } from '@mui/system';

import React, { useState } from 'react';
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
                Cadre le code barre de ton livre ou saisi-le dans le champs
                ci-dessous
                <br />
                <br />
                <Box
                    sx={{
                        border: '1px solid silver',
                        width: '100%',
                        maxWidth: '600px',
                        borderRadius: '5px',
                        marginBottom: '40px',
                    }}
                >
                    <SearchISBNBar />
                </Box>
            </Box>
            <BookDetailModal />
        </>
    );
};

export default ScanPage;
