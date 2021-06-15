var fs = require('fs');

const login = ({name}) => {
    var users_array = require("../data/users.json");
    var users = users_array.users

    var obj = {
        users: []
     };

     if(users.includes(name)){
        return {name};
    }else{
        const data = fs.readFileSync('./data/users.json', 'utf8');
            
        obj = JSON.parse(data);
        obj.users.push(name);
        json = JSON.stringify(obj);
        
        fs.writeFileSync('./data/users.json', json, 'utf8')
        return {name};
            // write it back 
        
    }
 }

 module.exports = {login}