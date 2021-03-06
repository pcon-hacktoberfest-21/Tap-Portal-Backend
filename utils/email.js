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

const CompaniesUpdates=(email,company)=>{
    const {Id,Name,Min_CGPA,Date_Of_Visit,Last_Date_Of_Apply,Package,Discription,PDF,Updated}=company;
    var sub= Updated? `${Name} has just updated some of the Informations `:`Congratulations you are eligible to apply for ${Name}`;
    sgMail.send({
        to: email,
        from: 'tap@nitjsr.ac.in',
        subject:sub,
        text:`Congratulations you are eligible to apply for ${Name}`,
        html: `<div>
                    <h1> ${Name} </h1>
                    <p>
                        ${Discription}
                    </p>
                    <br> <br>
                    <strong>Date of Visit: ${Date_Of_Visit.toString()} <br> Last Date to Apply: ${Last_Date_Of_Apply.toString()} <br> Package offering  : ${Package.toString()}</strong>
                    <p>
                        Please ignore this email if you did not request a password change.
                    </p>
                    <p>
                        <a href="${PDF}">
                            Follow this link to download required doc.
                        </a>
                    </p>

              </div>`,
    })
}

module.exports = {
    WelcomeEmail,
    CompaniesUpdates,
    resetPasswordEmail,
};
