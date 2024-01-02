const jwt = require('jsonwebtoken')


let EncodeToken= (email, user_id) => {
    let KEY = "MJU-12345"
    let EXPIRE = { expiresIn: '1h' }
    let PAYLOAD = { email : email, user_id : user_id}
    return jwt.sign(PAYLOAD, KEY, EXPIRE)
}


let DecodeToken = (token) => {
    try {
        let KEY = "MJU-12345"
        return jwt.verify(token, KEY)
    } catch (error) {
        return null
    }
}


module.exports = {EncodeToken, DecodeToken}
