import { useState } from "react";
import Register from "./Register";
import "./App.css"; // Importa o CSS do estilo Uiverse

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function entrar() {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: senha }),
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      console.log("Token salvo");
    } else {
      alert("Email ou senha incorretos");
    }
  }

  async function me() {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(data);
  }

  async function entrarEverMe() {
    await entrar();
    await me();
  }

  return (
    <div
      className="page"
      style={{ display: "flex", justifyContent: "center", marginTop: "3em" }}
    >
      {showRegister ? (
        <div>
          <Register />
          <button
            className="button2"
            onClick={() => {
              setShowRegister(false);
              setEmail("");
              setSenha("");
            }}
            style={{ marginTop: "1em",}}
          >
            Voltar ao Login
          </button>
        </div>
      ) : (
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            entrarEverMe();
          }}
        >
          <p id="heading">Login</p>

          <div className="field">
            <input
              autoComplete="off"
              placeholder="Email"
              className="input-field"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <input
              autoComplete="new-password"
              placeholder="Senha"
              className="input-field"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <div className="btn">
            <button type="submit" className="button1">
              Logar
            </button>
            <button
              type="button"
              className="button2"
              onClick={() => setShowRegister(true)}
            >
              Registrar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default App;
