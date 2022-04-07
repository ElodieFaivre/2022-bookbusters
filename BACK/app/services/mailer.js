const nodemailer = require("nodemailer");
const { getMaxListeners } = require("process");


const mailer = {

    async sendAlertingMails(users) {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        //let testAccount = await nodemailer.createTestAccount();
        //console.log (testAccount);
        // create reusable transporter object using the default SMTP transport


        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'bookbustersfrance@gmail.com',
                pass: `o'clock2022`,
            }
        });
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

module.exports = mailer;
