const http = require('http')
const emails = require('./data/emails')

const server = http.createServer((req, res) => {
    if (req.url === '/api/emails' && req.method === 'GET'){
        res.writeHead(200 , {'Constent-Type': 'application/json'})
        res.end(JSON.stringify(emails))
    }else if(req.url === '/api/users' && req.method === 'GET'){
        res.writeHead(404 , {'Constent-Type': 'application/json'})
        res.end(JSON.stringify({message :'Route Not Found'}))
    }else {
        res.writeHead(404 , {'Constent-Type': 'application/json'})
        res.end(JSON.stringify({message :'Route Not Found'}))
    }
    
})
const PORT = process.env.PORT || 1998

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
