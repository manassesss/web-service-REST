const http = require('http')
const {getEmails, getEmailbyId, getEmailsAll, deleteEmail, sendEmail, getSendtEmails} = require('./controllers/emailController')
const {login} = require('./controllers/userController')

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    if (req.url === '/login' && req.method === 'POST') {
        login(req, res);
    }else if(req.url === '/send' && req.method === 'POST') {
        sendEmail(req, res);
    }else if(req.url === '/enviadas' && req.method === 'GET') {
        api.getSendtEmails(req, res);
    }else if(req.url === '/emails' && req.method === 'GET') {
        getEmails(req, res);
    }else if(req.url === '/delete' && req.method === 'DELETE') {
        deleteEmail(req, res);
    }else{
        error = {
            message: '404 Page not found'
        }
        res.writeHead(201, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(error));
    }

})
server.listen(1998, () => console.log(`Server running on port 1998`))
