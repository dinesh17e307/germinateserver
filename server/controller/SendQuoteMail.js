
const nodeMailer = require('nodemailer'), transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bestfrnd5888@gmail.com',
        pass: 'dheena5880'
    }

}), EmailTemplate = require('email-templates').EmailTemplate,
    path = require('path'),
    Promise = require('bluebird');
const users=[
    {
        name: ';dienbsh',
        Quotevalue:49999,
        email:'dheena5880@gmail.com'
    }
]
function sendMail(obj) {
        return transporter.sendMail(obj)
}
function loadTemplate(templateName, contexts) {

    let template = new EmailTemplate(path.join(__dirname, 'templates', templateName));
    return Promise.all(contexts.map(context => {
        return new Promise((resolve, reject) => {
            template.render(context, (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve({
                        email: res,
                        context
                    })
            })
        })
    }))
}

const sendQuoteMail=(req,res)=>{
    console.log(req.body,users)
loadTemplate('QuoteTemplate', req.body).then((results) => {
    return Promise.all(results.map((result) => {
        console.log(result)
        sendMail({
            to: result.context.email,
            from: 'Germinate :)',
            subject: result.email.subject,
            html: result.email.html,
            text: result.email.text,
        });
    }))
}).then(() => [
    console.log('Yay !')
]).catch(err => {
    console.log(err)
});
}
module.exports={
    sendQuoteMail
}