import nodemailer from "nodemailer";

let adminEmail = process.env.MAIL_USER;
let adminPassword = process.env.MAIL_PASSWORD;
let mailHost = process.env.MAIL_HOST;
let mailPort = process.env.MAIL_PORT;

let sendMail = (to, subject, htmlContent)=>{
    let transporter = nodemailer.createTransport({
        host: mailHost,
        port: mailPort,
        secure: false, //use SSL-TLS. Vì ở local nên đặt thành false, khi chạy trên server thì chuyển thành true là giao thức bảo mật mail
        auth: {//xác thực
            user: adminEmail,
            pass: adminPassword
        }
    });
    let option = {
        from: adminEmail,
        to: to,
        subject: subject,
        html: htmlContent
    };

    return transporter.sendMail(option) //Hàm này sẽ trả về một Promise
}

module.exports = sendMail;