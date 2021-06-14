const http = require('http')
const {getEmails, getEmailbyId} = require('./controllers/emailController')

const server = http.createServer((req, res) => {
    if (req.url === '/api/emails' && req.method === 'GET'){
        getEmails(req, res)
    }else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET'){
        const id = req.url.split('/')
        getEmailbyId(req. res, id)
       
    } else {
        res.writeHead(404 , {'Constent-Type': 'application/json'})
        res.end(JSON.stringify({message :'Route Not Found'}))
    }
})
const PORT = process.env.PORT || 1998

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
