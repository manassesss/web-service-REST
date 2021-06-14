const emails = require('../data/emails')


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
    getEmails
    getEmailbyId
}