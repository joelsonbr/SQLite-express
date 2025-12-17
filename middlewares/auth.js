const jwt = require('jsonwebtoken')
const { secret } = require('../config/auth')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: 'Token não enviado' })
    }

    const parts = authHeader.split(' ')

    if (parts.length !== 2) {
        return res.status(401).json({ error: 'Token malformado' })
    }

    const [scheme, token] = parts

    if (scheme !== 'Bearer') {
        return res.status(401).json({ error: 'Token malformado' })
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' })
        }

        req.userId = decoded.id
        next()
    })
}