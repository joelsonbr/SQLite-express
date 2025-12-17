// routes/auth.js
const express = require('express')
const bcrypt = require('bcrypt')
const db = require('../database/db')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/auth')
const authMiddleware = require('../middlewares/auth')



const router = express.Router()

router.post('/register', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: 'Dados inválidos' })
    }

    const hash = await bcrypt.hash(password, 10)

    db.run(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [email, hash],
        function (err) {
            if (err) {
                return res.status(400).json({ error: 'Usuário já existe' })
            }

            res.status(201).json({
                id: this.lastID,
                email
            })
        }
    )
})

router.post('/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Dados inválidos' })
  }

  db.get(
    'SELECT * FROM users WHERE email = ?',
    [email],
    async (err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: 'Email ou senha incorretos' })
      }

      const ok = await bcrypt.compare(password, user.password)

      if (!ok) {
        return res.status(401).json({ error: 'Email ou senha incorretos' })
      }

      /* res.json({ message: 'Login OK', userId: user.id }) */
      const token = jwt.sign(
        {id: user.id },
        secret,
        { expiresIn: '1h' }
      )

      res.json({
        message: 'Login Ok',
        token
      })
    }
  )
})

router.get('/publico', (req, res) => {
    res.json({ message: 'Rota pública' })
})

router.get('/private', authMiddleware, (req, res) => {
    res.json({ message: 'Rota privada' })
})

router.get('/me', authMiddleware, (req, res) => {
  db.get(
    'SELECT id, email FROM users WHERE id = ?',
    [req.userId],
    (err, user) => {
      if (err || !user) {
        return res.status(404).json({ error: 'Usuário não encontrado' })
      }

      res.json(user)
    }
  )
})



module.exports = router
