const cron = require('node-cron');
const nodemailer = require("nodemailer");
const { getMaxListeners } = require("process");
const userDataMapper = require('../models/user');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bookbustersfrance@gmail.com',
        pass: `o'clock2022`,
    }
});

const mailer = {

    async sendAlertingMails(users) {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        //let testAccount = await nodemailer.createTestAccount();
        //console.log (testAccount);
        // create reusable transporter object using the default SMTP transport



        const promiseToSolve = [];
        users.forEach(user => {
            // send mail with defined transport object
            promiseToSolve.push(transporter.sendMail({
                from: '"bookbustersfrance@gmail.com"',// sender address
                to: `${user.email}`, // list of receivers
                subject: "Alerting mail", // Subject line
                text: "Salut", // plain text body
                html: `<b>Cher(e) BookBuster</b><br><b>Le livre que vous recherchez est disponible au don en suivant le lien ci-dessous :</b><br><b>http://localhost:3000/v1/book/isbn/${user.isbn13}</b><br><b>Bonne lecture !</b><br><b>L'équipe BookBusters</b>`, // html body
            }));
        });

        await Promise.all(promiseToSolve);


        // console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

};
// service mail pour les livres périmés tous les jours à 2 heures du mat
cron.schedule('0 0 2 * *', async () => {
    // collect of the users with expired book, ie book in donation for more than 180 days
    const users = await userDataMapper.findUsersWithExpiredBook();
    if (users) {
        const promiseToSolve = [];
        users.forEach(user => {
            // send mail with defined transport object

            const book = await google.findBookByISBN(user.isbn13);

            promiseToSolve.push(transporter.sendMail({
                from: '"bookbustersfrance@gmail.com"',// sender address
                to: `${user.email}`, // list of receivers
                subject: "Votre livre est-il toujours dispo ?", // Subject line
                text: "BookBusters", // plain text body
                html: `<b>Cher(e) BookBuster,</b><br><b>Le livre "${book.title}" de "${book.author} est en donation chez BookBusters. Est il toujours disponible ? </b><br><b>Si le livre est toujours en donation, cliquez sur le lien suivant.</b><br><b>http://localhost:3000/v1/book/isbn/${user.isbn13}</b><br><b>Si le livre n'est plus dispo, pas de souci. Dans quelques jours le livre sera retiré automatique de notre site</b><br><b>Et surtout, n'hésitez pas à nous apporter d'autres livres sur BookBusters !</b><br><b>L'équipe BookBusters</b>`, // html body
            }));
        });

        await Promise.all(promiseToSolve);
    }




    //transporter.sendMail(mailOptions, function(error, info){
    //      if (error) {
    //      console.log(error);
    //     } else {
    //       console.log('Email sent: ' + info.response);
    //     }
    //  });
});

module.exports = mailer;
