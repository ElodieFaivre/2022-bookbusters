const cron = require('node-cron');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const { getMaxListeners } = require("process");
const userDataMapper = require('../models/user');
const google = require('../services/google');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_LOGIN,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const mailer = {

    async sendAlertingMails(users) {
        const promiseToSolve = [];
        users.forEach(user => {
            // send mail with defined transport object
            promiseToSolve.push(transporter.sendMail({
                from: '"bookbustersfrance@gmail.com"', // sender address
                to: `${user.email}`, // list of receivers
                subject: "Alerting mail", // Subject line
                text: "BookBusters", // plain text body
                html: `<b>Cher(e) BookBuster</b><br><b>Le livre que vous recherchez est disponible au don en suivant le lien ci-dessous :</b><br><b>${process.env.BASE_URL}/book/isbn/${user.isbn13}</b><br><b>Bonne lecture !</b><br><b>L'équipe BookBusters</b>`, // html body
            }));
        });

        await Promise.all(promiseToSolve);
    },

    async confirmationMail(user) {
        // confirmation email
        jwt.sign(
            {
                userId: user.id,
            },
            process.env.SECRET_TOKEN_KEY,
            { expiresIn: '1d' },
            (err, emailToken) => {
                const url = `${process.env.BASE_URL}/confirmation/${emailToken}`;
                transporter.sendMail({
                    from: '"bookbustersfrance@gmail.com"', // sender address
                    to: `${user.email}`,
                    subject: "Confirmation de l'adresse email",
                    html: `Merci de cliquer sur le lien suivant pour confirmer votre email:<a href=${url}>${url}</a>`
                });
            },
        );
    },

};
// service mail every day at 2 am for the expired books.
cron.schedule('0 0 2 * *', async () => {
    // collect of the users with expired books, ie book in donation for more than 180 or 187 days
    const users = await userDataMapper.findUsersWithExpiredBook();
    if (users) {
        const expiredBook = [];
        users.forEach(user => {
            if (user.isbn13) {
                expiredBook.push(google.findBookByISBN(user.isbn13));
            } else {
                expiredBook.push(google.findBookByISBN(user.isbn10));
            }
        });
        const books = await Promise.all(expiredBook);
        const promiseToSolve = [];
        users.forEach(user => {
            const book = books.find((book) => user.isbn13 === book.isbn13 || user.isbn10 === book.isbn10);
            console.log (book, user);
            // send mail with defined transport object
            jwt.sign(
                {
                    bookId: user.book_id,
                    userId: user.id,
                },
                process.env.SECRET_TOKEN_KEY,
                { expiresIn: '2d' },
                (err, emailToken) => {
                    promiseToSolve.push(
                        transporter.sendMail({
                            from: '"bookbustersfrance@gmail.com"', // sender address
                            to: `${user.email}`, // list of receivers
                            subject: "Votre livre est-il toujours dispo ?", // Subject line
                            text: "BookBusters", // plain text body
                            html: `<b>Cher(e) BookBuster,</b><br><b>Le livre "${book.title}" de "${book.author} est en donation chez BookBusters. Est il toujours disponible ? </b><br><b>Si le livre est toujours en donation, cliquez sur le lien suivant.</b><br><b>${process.env.BASE_URL}/donation/${emailToken}</b><br><b>Si le livre n'est plus dispo, pas de souci. Dans quelques jours le livre sera retiré automatiquement de notre site</b><br><b>Et surtout, n'hésitez pas à nous apporter d'autres livres sur BookBusters !</b><br><b>L'équipe BookBusters</b>`, // html body
                        }),
                    );
                },
            );
        });
        await Promise.all(promiseToSolve);
    }
});

module.exports = mailer;
