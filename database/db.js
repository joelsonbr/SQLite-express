
// Importa SQLite3
const sqlite3 = require('sqlite3')

// Cria/conecta ao arquivo do banco de dados
// Se não existir, o arquivo database.db é criado 
const db = new sqlite3.Database('./database.db')

// Cria a tabela de usuários se ainda não existir
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
`)
/*  id INTEGER PRIMARY KEY AUTOINCREMENT -- id do usuário => chave primária inteira autocremental */
/* email TEXT UNIQUE NOT NULL -- email único => texto único não nulo */
/* password TEXT NOT NULL -- senha criptografada => texto não nulo */

// Exporta o banco para usar em outras partes do porjeto
module.exports = db