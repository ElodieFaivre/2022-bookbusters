import { Box } from "@mui/system";

import '../styles/Scan.scss';

import React, { useEffect, useContext } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

import { searchBookByISBN } from '../../api/fetchApi';
import BookDetailModal from "../BookDetailModal/BookDetailModal";

import bookContext from "../../contexts/BookContext";

const Scanner = () => {
    const { setOpenedBook } = useContext(bookContext);
    
    useEffect(() => {
        async function onScanSuccess(decodedText, decodedResult) {
            const isbn = decodedText

            const response = await searchBookByISBN(isbn);

            setOpenedBook(response.data);  
        }

        function onScanError(qrCodeError) {
            // This callback would be called in case of qr code scan error or setup error.
            // You can avoid this callback completely, as it can be very verbose in nature.
        }

        const config =  { 
            facingMode: "environment",
            fps: 60,
            qrbox: { width: 250, height: 250 },
            disableFlip: false,
            rememberLastUsedCamera: true,
            Html5QrcodeSupportedFormats: 'EAN_13',
        }

        const html5Qrcode = new Html5QrcodeScanner(
            'reader',
            config,
            false,
        );
        html5Qrcode.render(onScanSuccess, onScanError);
    });

    return (
        <>
        <Header />
        <Box>
            <div id="scanner">
                <div id='reader'></div>
            </div>
            <BookDetailModal />
        </Box>
        </>
    );
};

export default Scanner;
