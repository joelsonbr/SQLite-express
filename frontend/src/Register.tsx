import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (senha !== confirmSenha) {
      alert("As senhas não conferem!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha }),
      });

      if (res.ok) {
        alert("Registro feito com sucesso! Faça login agora.");
        setEmail("");
        setSenha("");
        setConfirmSenha("");
      } else {
        const data = await res.json();
        alert(data.message || "Erro ao registrar");
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão");
    }
  };

  return (
    <form className="form" onSubmit={handleRegister}>
      <p id="heading">Inscrever-se</p>

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

      <div className="field">
        <input
          autoComplete="new-password"
          placeholder="Senha"
          className="input-field"
          type="password"
          value={confirmSenha}
          onChange={(e) => setConfirmSenha(e.target.value)}
          required
        />
      </div>

      <div className="btn">
        <button type="submit" className="button1">
          Registrar
        </button>
      </div>
    </form>
  );
}
