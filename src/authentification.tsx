import { useState } from "react"

type PageAuth = "login" | "inscription" | "reset"

type Props = {
  onConnexion: (user: any) => void
}

export default function Authentification({ onConnexion }: Props) {
  const [page, setPage] = useState<PageAuth>("login")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nom, setNom] = useState("")

  
  const handleLogin = () => {
    if (!email || !password) {
      alert("Veuillez remplir tous les champs")
      return
    }

    const user = {
      nom: "Utilisateur",
      email: email
    }

    onConnexion(user) //connexion vers App
  }

  const handleRegister = () => {
    if (!nom || !email || !password) {
      alert("Veuillez remplir tous les champs")
      return
    }

    const user = {
      nom,
      email
    }

    onConnexion(user) // connexion vers App
  }

  const handleReset = () => {
    if (!email) {
      alert("Veuillez entrer votre email")
      return
    }

    alert(`Lien envoyé à ${email}`)
  }





  

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">

      <div className="w-full max-w-md bg-white border border-blue-200 rounded-2xl shadow-lg p-6 space-y-5">

        <h1 className="text-3xl font-bold text-center text-blue-800 bg-blue-100 border border-blue-300 rounded-xl py-2">
          Authentification
        </h1>

        {/* LOGIN */}
        {page === "login" && (
          <div className="space-y-4">

            <input
              type="email"
              placeholder="Massambadiouf@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400"
            />



            <input
              type="password"
              placeholder="mot de passe (8 caractères)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Se connecter
            </button>

            <div className="flex justify-between text-sm">
              <p onClick={() => setPage("inscription")} className="text-blue-600 cursor-pointer hover:underline">
                Créer un compte
              </p>

              <p onClick={() => setPage("reset")} className="text-blue-600 cursor-pointer hover:underline">
                Mot de passe oublié ?
              </p>
            </div>
          </div>
        )}

        {/* INSCRIPTION */}
        {page === "inscription" && (
          <div className="space-y-4">

            <input
              type="text"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={handleRegister}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              S'inscrire
            </button>

            <p
              onClick={() => setPage("login")}
              className="text-center text-sm text-blue-600 cursor-pointer hover:underline"
            >
              Déjà un compte ? Se connecter
            </p>
          </div>
        )}

        {/* RESET */}
        {page === "reset" && (
          <div className="space-y-4">

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={handleReset}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Réinitialiser mot de passe
            </button>

            <p
              onClick={() => setPage("login")}
              className="text-center text-sm text-blue-600 cursor-pointer hover:underline"
            >
              Retour à la connexion
            </p>
          </div>
        )}

      </div>
    </div>
  )
}