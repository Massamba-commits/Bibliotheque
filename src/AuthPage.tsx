import { useState } from "react"
import type { Utilisateur, PageAuth } from "./data";

//Login
function Login({ onConnexion, setPage }: { onConnexion: (e: string, n: string) => void; setPage: (p: PageAuth) => void }) {
  const [email, setEmail] = useState("")
  const [motDePasse, setMotDePasse] = useState("")
  const [erreur, setErreur] = useState("")

  const handleSubmit = () => {
    if (!email || !motDePasse) return setErreur("Veuillez remplir tous les champs.")
    onConnexion(email, email.split("@")[0])
  }

  return (
    <div>
      <p className="text-gray-500 text-sm mb-6">Connectez-vous à votre compte</p>
      {erreur && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">{erreur}</div>}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" placeholder="Massamba@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 border-amber-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-amber-500 bg-amber-50" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
          <input type="password" placeholder="••••••••" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)}
            className="w-full border-2 border-amber-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-amber-500 bg-amber-50" />
        </div>
        <div className="text-right">
          <button onClick={() => setPage("reinitialisation")} className="text-amber-600 text-sm hover:underline">Mot de passe oublié ?</button>
        </div>
        <button onClick={handleSubmit} className="w-full bg-green-600 hover:bg-green-300 text-white font-bold py-3 rounded-xl transition-all">
          Se connecter
        </button>
      </div>
      <p className="text-center text-sm text-gray-500 mt-6">
        Pas encore de compte ?{" "}
        <button onClick={() => setPage("inscription")} className="text-amber-600 font-semibold hover:underline">S'inscrire</button>
      </p>
    </div>
  )
}

// ─── Inscription ──────────────────────────────────────
function Inscription({ onConnexion, setPage }: { onConnexion: (e: string, n: string) => void; setPage: (p: PageAuth) => void }) {
  const [nom, setNom] = useState("")
  const [email, setEmail] = useState("")
  const [motDePasse, setMotDePasse] = useState("")
  const [confirmer, setConfirmer] = useState("")
  const [erreur, setErreur] = useState("")

  const handleSubmit = () => {
    if (!nom || !email || !motDePasse || !confirmer) return setErreur("Veuillez remplir tous les champs.")
    if (motDePasse !== confirmer) return setErreur("Les mots de passe ne correspondent pas.")
    if (motDePasse.length < 6) return setErreur("Mot de passe trop court (6 caractères min).")
    onConnexion(email, nom)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Créer un compte 📖</h2>
      <p className="text-gray-500 text-sm mb-6">Rejoignez notre bibliothèque</p>
      {erreur && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">{erreur}</div>}
      <div className="space-y-4">
        {[
          { label: "Nom complet", value: nom, set: setNom, type: "text", placeholder: "Jean Dupont" },
          { label: "Email", value: email, set: setEmail, type: "email", placeholder: "exemple@email.com" },
          { label: "Mot de passe", value: motDePasse, set: setMotDePasse, type: "password", placeholder: "••••••••" },
          { label: "Confirmer le mot de passe", value: confirmer, set: setConfirmer, type: "password", placeholder: "••••••••" },
        ].map((champ) => (
          <div key={champ.label}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{champ.label}</label>
            <input type={champ.type} placeholder={champ.placeholder} value={champ.value}
              onChange={(e) => champ.set(e.target.value)}
              className="w-full border-2 border-amber-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-amber-500 bg-amber-50" />
          </div>
        ))}
        <button onClick={handleSubmit} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl transition-all">
          S'inscrire
        </button>
      </div>
      <p className="text-center text-sm text-gray-500 mt-6">
        Déjà un compte ?{" "}
        <button onClick={() => setPage("login")} className="text-amber-600 font-semibold hover:underline">Se connecter</button>
      </p>
    </div>
  )
}

// ─── Réinitialisation ─────────────────────────────────
function Reinitialisation({ setPage }: { setPage: (p: PageAuth) => void }) {
  const [email, setEmail] = useState("")
  const [envoye, setEnvoye] = useState(false)

  if (envoye) return (
    <div className="text-center">
      <div className="text-6xl mb-4">📬</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Email envoyé !</h2>
      <p className="text-gray-500 text-sm mb-6">Un lien a été envoyé à <span className="font-semibold text-amber-700">{email}</span></p>
      <button onClick={() => setPage("login")} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl transition-all">
        Retour à la connexion
      </button>
    </div>
  )

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Mot de passe oublié 🔑</h2>
      <p className="text-gray-500 text-sm mb-6">Entrez votre email pour recevoir un lien de réinitialisation.</p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" placeholder="exemple@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 border-amber-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-amber-500 bg-amber-50" />
        </div>
        <button onClick={() => email && setEnvoye(true)} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl transition-all">
          Envoyer le lien
        </button>
      </div>
      <p className="text-center text-sm text-gray-500 mt-6">
        <button onClick={() => setPage("login")} className="text-amber-600 font-semibold hover:underline">← Retour à la connexion</button>
      </p>
    </div>
  )
}

// ─── AuthPage (export principal) ─────────────────────
export default function AuthPage({ onConnexion }: { onConnexion: (u: Utilisateur) => void }) {
  const [page, setPage] = useState<PageAuth>("login")

  const handleConnexion = (email: string, nom: string) => onConnexion({ email, nom })

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">📚</div>
          <h1 className="text-3xl font-bold text-amber-900">Bibliothèque Nationale</h1>
          <p className="text-amber-600 text-sm mt-1">Votre espace de lecture</p>
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-amber-100">
          {page !== "reinitialisation" && (
            <div className="flex bg-amber-50 rounded-xl p-1 mb-6">
              {(["login", "inscription"] as PageAuth[]).map((p) => (
                <button key={p} onClick={() => setPage(p)}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${page === p ? "bg-white text-amber-700 shadow" : "text-gray-400 hover:text-gray-600"}`}>
                  {p === "login" ? "Connexion" : "Inscription"}
                </button>
              ))}
            </div>
          )}
          {page === "login" && <Login onConnexion={handleConnexion} setPage={setPage} />}
          {page === "inscription" && <Inscription onConnexion={handleConnexion} setPage={setPage} />}
          {page === "reinitialisation" && <Reinitialisation setPage={setPage} />}
        </div>
      </div>
    </div>
  )
}