function generateMessage(message) {
    return {
        message,
        date: new Date().getTime()
    }
}

module.exports = {
    generateMessage
};