const Email = require('../models/emailModel')

async function sendEmail(req, res) {
    try {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async() => {
            const {sender, receiver, subject, content} = JSON.parse(body);

            delete require.cache[require.resolve('./dados/emails.json')];
            var messages_array = require('./dados/emails.json');

            var messages = messages_array.messages
            message = {
                id: messages.length,
                sender,
                receiver,
                subject,
                content,
                forward: false
            }
            const sended = await Mensagens.send(message);
            res.writeHead(201, {'Content-Type': 'application/json'})
            console.log(sended)
            return res.end(JSON.stringify(sended));
        })
    }catch(error){
        console.log(error)
    }
}

async function deleteEmail(req, res) {
    const Messages = require('./models/emailModel');
    try {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async() => {
            const {id} = JSON.parse(body);
            const deleted = await Mensagens.apagar(id);
            res.writeHead(201, {'Content-Type': 'application/json'})
            console.log(deleted)
            return res.end(JSON.stringify(deleted));
        })
    }catch(error){
        console.log(error)
    }
}

async function getEmails(req, res){

    try{
        const emails = await Email.getEmails()

        res.writeHead(200 , {'Constent-Type': 'application/json'})
        res.end(JSON.stringify(emails))
    } catch(error){
        console.log(error)
    }
}

async function getEmailbyId(req, res,id){

    try{
        const email = await Email.getEmailbyId(id)
        if(!email){
            res.writeHead(404, {'Constent-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Email Not Found'}))
        } else {
            res.writeHead(200 , {'Constent-Type': 'application/json'})
            res.end(JSON.stringify(emails))
        }
        
    } catch(error){
        console.log(error)
    }
}


module.exports = {
    getEmails, getEmailbyId, sendEmail, deleteEmail
}