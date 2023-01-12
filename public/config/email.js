const nodemailer = require("nodemailer");

async function mailMessage() {
    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false,
        auth: {
            user: 'recuperacaodesenha38@outlook.com',
            pass: '@recuper@c@O',
    },
    });
    let info = await transporter.sendMail({
        from: 'recuperacaodesenha38@outlook.com',
        to: emailTroca,
        subject: "Mensagem de recuperação de senha",
        text: ``,
        html: `Olá ${nomeUser[0].nome}, sua senha foi alterada com sucesso! Caso não tenha feito essa alteração, entre em contato com o suporte pelo número (00)0000-0000`
    })
    .then(() => console.log('Deu bom'))
    .catch((err) => console.log('Deu ruim', err));
}

module.exports = { mailMessage }