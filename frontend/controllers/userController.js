const Users = require('../models/userModel')

async function login(req, res) {
    try {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async() => {
            const {name} = JSON.parse(body);

            user = {
                name
            }
            const login = await Users.login(user);
            res.writeHead(201, {'Content-Type': 'application/json'})
            console.log(login)
            return res.end(JSON.stringify(login));
        })
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    login
}