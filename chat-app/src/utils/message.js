function generateMessage(message, author) {
    return {
        message,
        author,
        date: new Date().getTime()
    }
}

module.exports = {
    generateMessage
};