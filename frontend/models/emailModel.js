const emails = require('../data/emails')
var fs = require('fs');

const sendEmail = ({id, sender, receiver, subject, content, forward}) => {
    delete require.cache[require.resolve("../data/users.json")];
    var users_array = require("../data/users.json");
    var users = users_array.users
    
    var obj = {
     };
     console.log(receiver)
     if(users.includes(sender) && users.includes(receiver)){
        
        const data = fs.readFileSync('./data/emails.json', 'utf8');
            
            obj = JSON.parse(data);
            
            obj.push({id, sender, receiver, subject, content, forward});
            json = JSON.stringify(obj);
            
            fs.writeFileSync('./data/emails.json', json, 'utf8');
            return {id, sender, receiver, subject, content, forward};
            

     }else{
        return {message: 'Receiver does not exist :/'};
     }
}

const deleteEmail = (id) => {
    var obj = {
        messages: []
     };

    const data = fs.readFileSync('./data/emails.json', 'utf8');
        
    obj = JSON.parse(data);
    delete require.cache[require.resolve('../data/emails.json')];
    var messages_array = require('../data/emails.json');
    var messages = messages_array.messages;
    for(i=0; i < obj.messages.length; i++){
        if(messages[i].id == id){
            obj.messages.splice(i, 1);
        }
    }
    json = JSON.stringify(obj);
    
    fs.writeFileSync('./data/emails.json', json, 'utf8')
    return {message: 'Message was deleted!'};
}
const forwardEmail = ({id, sender, receiver, forward}) => {
    var obj = {
        messages: []
     };

    const data = fs.readFileSync('./data/email.json', 'utf8');
    delete require.cache[require.resolve('../data/email.json')];
    var messages_array = require('../data/email.json');
    var messages = messages_array.messages;
    obj = JSON.parse(data);
    for(i=0; i < obj.messages.length; i++){
        if(messages[i].id == id){
            var subject = messages[i].subject;
            var content = messages[i].content;
        }
    }
    id = obj.messages.length;
    obj.messages.push({id, sender, receiver, subject, content, forward});
    json = JSON.stringify(obj);
    
    fs.writeFileSync('./data/email.json', json, 'utf8');
    return {id, sender, receiver, subject, content, forward};
    
}
const getReceived = (user) => {
    var obj = {
        messages: []
     };
    console.log(user);
    delete require.cache[require.resolve('../data/emails.json')];
    var messages_array = require('../data/emails.json');
    for(i=0; i < messages_array.length; i++){
        if(messages_array[i].receiver == user){
            obj.messages.push(messages_array[i])
        }
    }
    return obj.messages
}

const getSentEmails = (user) => {
    var obj = {
        messages: []
     };
    console.log(user);
    delete require.cache[require.resolve('../data/email.json')];
    var messages_array = require('../data/email.json');
    var messages = messages_array.messages
    for(i=0; i < messages.length; i++){
        if(messages[i].receiver == user){
            obj.messages.push(messages[i])
        }
    }
    return obj
}

const getMensagem = (id) => {

    const data = fs.readFileSync('./data/emails.json', 'utf8');
    delete require.cache[require.resolve('../data/emails.json')];
    var messages_array = require('../data/emails.json');
    var messages = messages_array;
    obj = JSON.parse(data);
    for(i=0; i < obj.messages.length; i++){
        if(messages[i].id == id){
            var sender = messages[i].sender;
            var receiver = messages[i].receiver;
            var subject = messages[i].subject;
            var content = messages[i].content;
            var forward = messages[i].forward;
        }
    }
    return {id, sender, receiver, subject, content, forward};
    
}


function getEmails() {
    return new Promise ((resolve, reject) => {
        resolve(emails)

    })
}

function getEmailbyId(id) {
    return new Promise ((resolve, reject) => {
        const email = emails.find((e) => e.id === id)
        resolve(email)
    })
}

module.exports = {
    getEmails , getEmailbyId, sendEmail, deleteEmail, forwardEmail, getSentEmails, getReceived
}