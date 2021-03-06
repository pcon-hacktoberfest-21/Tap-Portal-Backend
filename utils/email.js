const sgMail = require("@sendgrid/mail");

const sendgridApikey = "";

sgMail.setApiKey(sendgridApikey);

const WelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "tap@nitjsr.ac.in",
    subject: "Thnx for joining TAP",
    text: `Welcome to TAP, ${name}.`,
  });
};

const resetPasswordEmail = (email, link) => {
  sgMail.send({
    to: email,
    from: "tap@nitjsr.ac.in",
    subject: "RESET PASSWORD LINK",
    html: `<div>
    <p>
        You have requested a password reset, please follow the link below to reset your password.
    </p>
    <p>
        Please ignore this email if you did not request a password change.
    </p>

    <p>
        <a href="${link}">
            Follow this link to reset your password.
        </a>
    </p>
</div>`,
  });
};

module.exports = {
  WelcomeEmail,
  resetPasswordEmail,
};
