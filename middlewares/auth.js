// Biblioteca para trabalhar com JWT (jsonwebtoken)
const jwt = require('jsonwebtoken')

// Chave secreta usada para avalidar o token
const { secret } = require('../config/auth')

// Middlewares de autenticação
module.exports = (req, res, next) => {

    // Pega p Header Authorization
    const authHeader = req.headers.authorization

    // Se não tiver token
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não enviado' })
    }

    // Separa "Bearer TOKEN"
    const parts = authHeader.split(' ')

    // Tem que ter duas partes ['Bearer', 'TOKEN']
    if (parts.length !== 2) {
        return res.status(401).json({ error: 'Token malformado' })
    }


    // scheme = Bearer | token = JWT
    const [scheme, token] = parts


    // Verifica se começa com Bearer
    if (scheme !== 'Bearer') {
        return res.status(401).json({ error: 'Token malformado' })
    }

    // Válida o token usando a chave secreta
    jwt.verify(token, secret, (err, decoded) => {
        // Token inválido ou expirado
        if (err) {
            return res.status(401).json({ error: 'Token inválido' })
        }

        // Guarda o id do usuário logado na requisição
        req.userId = decoded.id
        
        // Libera a rota
        next()
    })
}
// Esse middleware decide quem entra e quem não entra.