function generateClipId(length) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    let result = ''

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length)
        result += alphabet.charAt(randomIndex)
    }

    return result
}

module.exports = {
    generateClipId
}