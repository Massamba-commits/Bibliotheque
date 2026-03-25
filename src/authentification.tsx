import { useState } from "react"

type PageAuth = "login" | "inscription" | "reset"

type Props = {
  onConnexion: (user: any) => void
}

// ─── Validation ───────────────────────────────────────
const emailValide = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const validerMotDePasse = (password: string) => ({
  longueur: password.length >= 8 && password.length <= 20,
  majuscule: /[A-Z]/.test(password),
  minuscule: /[a-z]/.test(password),
  chiffre: /[0-9]/.test(password),
  special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
})

export default function Authentification({ onConnexion }: Props) {
  const [page, setPage] = useState<PageAuth>("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nom, setNom] = useState("")
  const [showConditions, setShowConditions] = useState(false)
  const [erreur, setErreur] = useState("")

  const validation = validerMotDePasse(password)
  const motDePasseValide = Object.values(validation).every(Boolean)

  const resetChamps = () => {
    setEmail("")
    setPassword("")
    setNom("")
    setErreur("")
    setShowConditions(false)
  }

  const changerPage = (p: PageAuth) => {
    resetChamps()
    setPage(p)
  }

  //  Login 
  const handleLogin = () => {
    if (!email || !password) return setErreur("Veuillez remplir tous les champs.")
    if (!emailValide(email)) return setErreur("Adresse email invalide.")
    if (!motDePasseValide) return setErreur("Mot de passe incorrect.")
    onConnexion({ nom: email.split("@")[0], email })
  }

  // ─── Inscription 
  const handleRegister = () => {
    if (!nom || !email || !password) return setErreur("Veuillez remplir tous les champs.")
    if (!emailValide(email)) return setErreur("Adresse email invalide.")
    if (!motDePasseValide) return setErreur("Le mot de passe ne respecte pas les conditions.")
    onConnexion({ nom, email })
  }

  // ─── Reset mot de passe
  const handleReset = () => {
    if (!email) return setErreur("Veuillez entrer votre email.")
    if (!emailValide(email)) return setErreur("Adresse email invalide.")
    alert(`Lien de réinitialisation envoyé à ${email}`)
  }

  // ─── Composant conditions mot de passe 
  const ConditionsMotDePasse = () => (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mt-2 space-y-1">
      {[
        { label: "8 à 20 caractères", ok: validation.longueur },
        { label: "Une majuscule (A-Z)", ok: validation.majuscule },
        { label: "Une minuscule (a-z)", ok: validation.minuscule },
        { label: "Un chiffre (0-9)", ok: validation.chiffre },
        { label: "Un caractère spécial (!@#$...)", ok: validation.special },
      ].map((r) => (
        <div key={r.label} className={`flex items-center gap-2 text-xs ${r.ok ? "text-green-600" : "text-red-400"}`}>
          <span>{r.ok ? "✅" : "❌"}</span>
          <span>{r.label}</span>
        </div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-md bg-white border border-blue-200 rounded-2xl shadow-lg p-6 space-y-5">

        <h1 className="text-3xl font-bold text-center text-blue-800 bg-blue-100 border border-blue-300 rounded-xl py-2">
          Authentification
        </h1>

        {/* Erreur globale */}
        {erreur && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
            {erreur}
          </div>
        )}

        {/* ─── LOGIN */}
        {page === "login" && (
          <div className="space-y-4">
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="exemple@gmail.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErreur("") }}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 ${
                  email.length > 0 && !emailValide(email)
                    ? "border-red-400"
                    : "border-blue-200"
                }`}
              />
              {email.length > 0 && !emailValide(email) && (
                <p className="text-red-400 text-xs mt-1">❌ Adresse email invalide</p>
              )}
              {email.length > 0 && emailValide(email) && (
                <p className="text-green-500 text-xs mt-1">✅ Email valide</p>
              )}
            </div>

            {/* Mot de passe */}
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErreur("") }}
              className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400"
            />

            <button onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
              Se connecter
            </button>

            <div className="flex justify-between text-sm">
              <p onClick={() => changerPage("inscription")} className="text-blue-600 cursor-pointer hover:underline">
                Créer un compte
              </p>
              <p onClick={() => changerPage("reset")} className="text-blue-600 cursor-pointer hover:underline">
                Mot de passe oublié ?
              </p>
            </div>
          </div>
        )}

        {/* INSCRIPTION */}
        {page === "inscription" && (
          <div className="space-y-4">
            {/* Nom */}
            <input
              type="text"
              placeholder="Nom complet"
              value={nom}
              onChange={(e) => { setNom(e.target.value); setErreur("") }}
              className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400"
            />

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="exemple@gmail.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErreur("") }}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 ${
                  email.length > 0
                    ? emailValide(email) ? "border-green-400" : "border-red-400"
                    : "border-blue-200"
                }`}
              />
              {email.length > 0 && !emailValide(email) && (
                <p className="text-red-400 text-xs mt-1">❌ Adresse email invalide</p>
              )}
              {email.length > 0 && emailValide(email) && (
                <p className="text-green-500 text-xs mt-1">✅ Email valide</p>
              )}
            </div>

            {/* Mot de passe fort */}
            <div>
              <input
                type="password"
                placeholder="Mot de passe fort"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setShowConditions(true); setErreur("") }}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 ${
                  password.length === 0
                    ? "border-blue-200"
                    : motDePasseValide ? "border-green-400" : "border-red-400"
                }`}
              />
              {showConditions && <ConditionsMotDePasse />}
            </div>

            <button onClick={handleRegister}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
              S'inscrire
            </button>

            <p onClick={() => changerPage("login")}
              className="text-center text-sm text-blue-600 cursor-pointer hover:underline">
              Déjà un compte ? Se connecter
            </p>
          </div>
        )}

        {/* ─── RESET PASSWORD  */}
        {page === "reset" && (
          <div className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="exemple@gmail.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErreur("") }}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 ${
                  email.length > 0
                    ? emailValide(email) ? "border-green-400" : "border-red-400"
                    : "border-blue-200"
                }`}
              />
              {email.length > 0 && !emailValide(email) && (
                <p className="text-red-400 text-xs mt-1">❌ Adresse email invalide</p>
              )}
              {email.length > 0 && emailValide(email) && (
                <p className="text-green-500 text-xs mt-1">✅ Email valide</p>
              )}
            </div>

            <button onClick={handleReset}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
              Réinitialiser mot de passe
            </button>

            <p onClick={() => changerPage("login")}
              className="text-center text-sm text-blue-600 cursor-pointer hover:underline">
              Retour à la connexion
            </p>
          </div>
        )}

      </div>
    </div>
  )
}