const sgMail = require('@sendgrid/mail')
//api key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name)=>{
    sgMail.send({
    to: email,
    //in real world would be from domain name email
    from: 'greallra@tcd.ie',
    subject: 'Thanks for signing up!',
    text: `Hey ${name}, Welcome to the app!`
})
}

const sendCancellationEmail = (email, name)=>{
    sgMail.send({
        to: email,
        from: 'greallra@tcd.ie',
        subject: 'Account Cancellation!',
        text: `We will miss you, ${name}!`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}
