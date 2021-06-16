const http = require('http')
const {deleteEmail, sendEmail, getReceived, readEmail} = require('./controllers/emailController')
const {login} = require('./controllers/userController');


const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    if (req.url === '/login' && req.method === 'POST') {
        login(req, res);
    }else if(req.url === '/send' && req.method === 'POST') {
        sendEmail(req, res);
    }else if(req.url === '/received' && req.method === 'GET') {
        api.getSendtEmails(req, res);
    }else if(req.url === '/emails' && req.method === 'POST') {
        getReceived(req, res);
    }else if(req.url === '/delete' && req.method === 'DELETE') {
        deleteEmail(req, res);
    }else if(req.url === '/readEmail' && req.method === 'POST') {
        readEmail(req, res);
    }else{
        error = {
            message: '404 Page not found'
        }
        res.writeHead(201, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(error));
    }

})
server.listen(1998, () => console.log(`Server running on port 1998`))
