import { useState } from "react"

// Types
type PageAuth = "login" | "inscription" | "reset"

export default function Authentification() {
  const [page, setPage] = useState<PageAuth>("login")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nom, setNom] = useState("")

  // Simulations (à remplacer plus tard par API)
  const handleLogin = () => {
    alert(`Connexion avec ${email}`)
  }

  const handleRegister = () => {
    alert(`Inscription de ${nom}`)
  }

  const handleReset = () => {
    alert(`Lien envoyé à ${email}`)
  }

  return (
    <div style={styles.container}>
      <h1>Authentification</h1>

      {/* LOGIN */}
      {page === "login" && (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Se connecter</button>

          <p onClick={() => setPage("inscription")}>
            Créer un compte
          </p>

          <p onClick={() => setPage("reset")}>
            Mot de passe oublié ?
          </p>
        </>
      )}

      {/* INSCRIPTION */}
      {page === "inscription" && (
        <>
          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleRegister}>S'inscrire</button>

          <p onClick={() => setPage("login")}>
            Déjà un compte ? Se connecter
          </p>
        </>
      )}

      {/* RESET */}
      {page === "reset" && (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={handleReset}>
            Réinitialiser mot de passe
          </button>

          <p onClick={() => setPage("login")}>
            Retour à la connexion
          </p>
        </>
      )}
    </div>
  )
}

// Styles simples
const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    width: "300px",
    margin: "auto",
    gap: "10px",
    textAlign: "center" as const
  }
}