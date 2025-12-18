// Configurações de autenticação 
// Usado pra criar e validar p token JWT

module.exports = {
  // Chave secreta usada para assinar o token
  // Quem cria e quem valida o token usa essa mesma chave
  secret: 'segredo_super_secreto'
}

// Sem cahve o token não funciona