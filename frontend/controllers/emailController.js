const Email = require('../models/emailModel')

async function sendEmail(req, res) {
    try {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async() => {
            const {sender, receiver, subject, content} = JSON.parse(body);

            delete require.cache[require.resolve('../data/emails.json')];
            var messages_array = require('../data/emails.json');

            var messages = messages_array
            message = {
                id: messages.length,
                sender,
                receiver,
                subject,
                content,
                forward: false
            }
            const sended = await Email.sendEmail(message);
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
            const deleted = await Email.deleteEmail(id);
            res.writeHead(201, {'Content-Type': 'application/json'})
            console.log(deleted)
            return res.end(JSON.stringify(deleted));
        })
    }catch(error){
        console.log(error)
    }
}

async function forwardEmail(req, res) {
    const Mensagens = require('./models/messageModel');
    try {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async() => {
            const {id, remetente, destinatario} = JSON.parse(body);
            message = {id, 
                sender, 
                receeiver, 
                forward: true
            }
            const forwarded = await Email.encaminhar(message);
            res.writeHead(201, {'Content-Type': 'application/json'})
            console.log(forwarded)
            return res.end(JSON.stringify(forwarded));
        })
    }catch(error){
        console.log(error)
    }
}

async function getSentEmails(req, res) {
    const email = require('./models/emailModel');
    try {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async() => {
            const {user} = JSON.parse(body);
            const sent = await email.getSendtEmails(user);
            res.writeHead(201, {'Content-Type': 'application/json'})
            console.log(sent)
            return res.end(JSON.stringify(sent));
        })
    }catch(error){
        console.log(error)
    }
}

async function getEmailsAll(req, res) {
    try {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async() => {
            const received = await Email.getEmailsAll();
            res.writeHead(201, {'Content-Type': 'application/json'})
            console.log(received)
            return res.end(JSON.stringify(received));
        })
    }catch(error){
        console.log(error)
    }
}

async function getReceived(req, res) {
    try {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async() => {
            const {user} = JSON.parse(body);
            const received = await Email.getReceived(user);
            res.writeHead(201, {'Content-Type': 'application/json'})
            console.log(received)
            return res.end(JSON.stringify(received));
        })
    }catch(error){
        console.log(error)
    }
}

async function readEmail(req, res) {
    const Emails = require('./models/emailModel');
    try {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async() => {
            const {id} = JSON.parse(body);
            const email = await Emails.getMensagem(id);
            res.writeHead(201, {'Content-Type': 'application/json'})
            console.log(email)
            return res.end(JSON.stringify(email));
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
    getEmails, getEmailbyId, sendEmail, deleteEmail, getEmailsAll, forwardEmail, getSentEmails, getReceived, readEmail
}