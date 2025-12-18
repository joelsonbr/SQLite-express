import { useState } from 'react'

function App() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  async function entrar() {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password: senha
      })
    })

    const data = await response.json()
    if (data.token) {
      localStorage.setItem('token', data.token)
      console.log('Token salvo')
    }
  }

  async function me() {
    const token = localStorage.getItem('token')

    const response = await fetch('http://localhost:3000/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json()
    console.log(data)
  }
  
  async function entrarEverMe() {
    await entrar()
    await me()
  }

  return (
    <div className='page'>
      <h1>Login</h1>

      <input 
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
       />
      <br />
      <input 
        placeholder="Senha" 
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
       />
      <br />
      <button onClick={entrarEverMe}>Entrar</button>
    </div>
  )
}

export default App
