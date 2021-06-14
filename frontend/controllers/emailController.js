const Email = require('../models/emailModel')


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
    getEmails
    getEmailbyId
}