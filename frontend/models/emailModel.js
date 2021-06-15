const emails = require('../data/emails')
var fs = require('fs');

const sendEmail = ({id, sender, receiver, subject, content, forward}) => {
    delete require.cache[require.resolve("../dados/users.json")];
    var users_array = require("../dados/users.json");
    var users = users_array.users
    
    var obj = {
        messages: []
     };

     if(users.includes(sender) && users.includes(receiver)){
        
        const data = fs.readFileSync('./dados/emails.json', 'utf8');
            
            obj = JSON.parse(data);
            
            obj.messages.push({id, sender, receiver, subject, content, forward});
            json = JSON.stringify(obj);
            
            fs.writeFileSync('./dados/emails.json', json, 'utf8');
            return {id, sender, receiver, subject, content, forward};
            

     }else{
        return {message: 'Receiver does not exist :/'};
     }
}

const deleteEmail = (id) => {
    var obj = {
        messages: []
     };

    const data = fs.readFileSync('./dados/emails.json', 'utf8');
        
    obj = JSON.parse(data);
    delete require.cache[require.resolve('../dados/emails.json')];
    var messages_array = require('../dados/emails.json');
    var messages = messages_array.messages;
    for(i=0; i < obj.messages.length; i++){
        if(messages[i].id == id){
            obj.messages.splice(i, 1);
        }
    }
    json = JSON.stringify(obj);
    
    fs.writeFileSync('./dados/emails.json', json, 'utf8')
    return {message: 'Message was deleted!'};
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
    getEmails , getEmailbyId, sendEmail, deleteEmail
}