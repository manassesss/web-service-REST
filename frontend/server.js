const http = require('http')
const emails = require('./data/emails')

const server = http.createServer((req, res) => {

    res.writeHead(200 , {'Constent-Type': 'application/json'})
    res.end(JSON.stringify(emails))
    
})
const PORT = process.env.PORT || 1998

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
