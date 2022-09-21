module.exports = {
    generateRandomId: () => {
        Math.floor(Math.random() * Date.now())   
    }
}