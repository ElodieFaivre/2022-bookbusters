import React, { useEffect, useContext } from 'react';

import './style.scss';

import {
    Html5QrcodeScanner,
    Html5QrcodeScanType,
    Html5QrcodeSupportedFormats,
} from 'html5-qrcode';

import { searchBookByISBN } from '../../api/fetchApi';
import bookContext from '../../contexts/BookContext';

const Scan = () => {
    const { setOpenedBook } = useContext(bookContext);

    const isbnRegexp = /^97[8-9]\d{10}$/;

    useEffect(() => {
        async function onScanSuccess(decodedText, decodedResult) {
            html5QrcodeScanner.pause();

            const scannedISBN = decodedText;

            if (
                scannedISBN &&
                scannedISBN.length === 13 &&
                isbnRegexp.test(scannedISBN)
            ) {
                console.log(`Scan ok, the ISBN is : ${scannedISBN}`);

                const response = await searchBookByISBN(decodedText);
                setOpenedBook(response.data);
            } else {
                console.log(
                    `The scanned bar code is not an ISBN : ${scannedISBN}`,
                );
                html5QrcodeScanner.resume();
            }
        }

        const config = {
            // Prefer back (environment) or front (portrait) camera
            facingMode: 'environment',
            //focusMode: 'continuous',
            fps: 10,
            qrbox: { width: 200, height: 100 },
            rememberLastUsedCamera: true,
            // Set to false to prevent mirrored camera
            disableFlip: false,
            // Only support camera scan type, not file photo import
            supportedScanTypes: [
                Html5QrcodeScanType.SCAN_TYPE_CAMERA,
                // Html5QrcodeScanType.SCAN_TYPE_FILE,
            ],
            // Restrict barcode format to EAN_13
            formatsToSupport: [Html5QrcodeSupportedFormats.EAN_13],
            experimentalFeatures: {
                useBarCodeDetectorIfSupported: true,
            },
            // videoConstraints: {
            //     focusMode: 'continuous',
            //     facingMode: 'environment',
            // },
        };

        const html5QrcodeScanner = new Html5QrcodeScanner(
            'reader',
            config,
            false,
        );

        html5QrcodeScanner.render(onScanSuccess);
    });

    return (
        <div id='scanner'>
            <div id='reader'></div>
        </div>
    );
};

export default Scan;
