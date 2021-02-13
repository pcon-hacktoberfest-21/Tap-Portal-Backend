const sgMail = require('@sendgrid/mail')


const sendgridApikey = ''

sgMail.setApiKey(sendgridApikey)

const WelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'tap@nitjsr.ac.in',
        subject: 'Thnx for joining TAP',
        text: `Welcome to TAP, ${name}.`
    })
} 

module.exports = {
    WelcomeEmail
}