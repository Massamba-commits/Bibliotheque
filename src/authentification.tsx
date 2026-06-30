import { useState } from "react"
import api from "./api"

type PageAuth = "login" | "inscription" | "reset"

type Props = {
  onConnexion: (user: any, token: string) => void
}

// ─── Validation ───────────────────────────────────────
const emailValide = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const validerMotDePasse = (password: string) => ({
  longueur: password.length >= 6,
  majuscule: /[A-Z]/.test(password),
  minuscule: /[a-z]/.test(password),
  chiffre: /[0-9]/.test(password),
  special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
})

function getForce(password: string) {
  const v = validerMotDePasse(password)
  const score = Object.values(v).filter(Boolean).length
  const config: Record<number, { label: string; color: string; width: string }> = {
    0: { label: "",            color: "bg-gray-200",   width: "w-0"    },
    1: { label: "Très faible", color: "bg-red-500",    width: "w-1/4"  },
    2: { label: "Faible",      color: "bg-orange-400", width: "w-2/4"  },
    3: { label: "Moyen",       color: "bg-yellow-400", width: "w-3/4"  },
    4: { label: "Fort",        color: "bg-green-400",  width: "w-full" },
    5: { label: "Très fort",   color: "bg-green-600",  width: "w-full" },
  }
  const labelColor: Record<number, string> = {
    0: "text-gray-400", 1: "text-red-500", 2: "text-orange-400",
    3: "text-yellow-500", 4: "text-green-500", 5: "text-green-700",
  }
  return { score, ...config[score], labelColor: labelColor[score], validation: v }
}

function EyeIcon({ visible }: { visible: boolean }) {
  return visible ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88L6.59 6.59m7.532 7.532l3.29 3.29M3 3l18 18" />
    </svg>
  )
}

function BarreForce({ password }: { password: string }) {
  if (password.length === 0) return null
  const force = getForce(password)
  return (
    <div className="mt-2">
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-300 ${force.color} ${force.width}`} />
      </div>
      <p className={`text-xs font-semibold mt-1 ${force.labelColor}`}>{force.label}</p>
    </div>
  )
}

function ConditionsMotDePasse({ password }: { password: string }) {
  const validation = validerMotDePasse(password)
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mt-2 space-y-1">
      {[
        { label: "6 caractères minimum",          ok: validation.longueur  },
        { label: "Une majuscule (A-Z)",            ok: validation.majuscule },
        { label: "Une minuscule (a-z)",            ok: validation.minuscule },
        { label: "Un chiffre (0-9)",               ok: validation.chiffre   },
        { label: "Un caractère spécial (!@#$...)", ok: validation.special   },
      ].map((r) => (
        <div key={r.label}
          className={`flex items-center gap-2 text-xs ${r.ok ? "text-green-600" : "text-red-400"}`}>
          <span>{r.ok ? "✅" : "❌"}</span>
          <span>{r.label}</span>
        </div>
      ))}
    </div>
  )
}

type ChampMdpProps = {
  placeholder?: string
  value: string
  onChange: (val: string) => void
  visible: boolean
  onToggle: () => void
  showForce?: boolean
  showConds?: boolean
  showCondsVisible?: boolean
}

function ChampMotDePasse({
  placeholder = "Mot de passe", value, onChange, visible,
  onToggle, showForce = false, showConds = false, showCondsVisible = false,
}: ChampMdpProps) {
  const valide = Object.values(validerMotDePasse(value)).every(Boolean)
  return (
    <div>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-400 ${
            value.length === 0 ? "border-blue-200" : valide ? "border-green-400" : "border-red-400"
          }`}
        />
        <button type="button" onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors">
          <EyeIcon visible={visible} />
        </button>
      </div>
      {showForce && <BarreForce password={value} />}
      {showConds && showCondsVisible && <ConditionsMotDePasse password={value} />}
    </div>
  )
}

// ─── Composant principal ──────────────────────────────
export default function Authentification({ onConnexion }: Props) {
  const [page, setPage]               = useState<PageAuth>("login")
  const [email, setEmail]             = useState("")
  const [password, setPassword]       = useState("")
  const [nom, setNom]                 = useState("")
  const [showConditions, setShowConditions] = useState(false)
  const [erreur, setErreur]           = useState("")
  const [loading, setLoading]         = useState(false)
  const [showPassLogin, setShowPassLogin] = useState(false)
  const [showPassReg, setShowPassReg]     = useState(false)

  const resetChamps = () => {
    setEmail(""); setPassword(""); setNom("")
    setErreur(""); setShowConditions(false)
    setShowPassLogin(false); setShowPassReg(false)
  }

  const changerPage = (p: PageAuth) => { resetChamps(); setPage(p) }

  // ── Login → appel API ──
  const handleLogin = async () => {
    if (!email || !password) return setErreur("Veuillez remplir tous les champs.")
    if (!emailValide(email)) return setErreur("Adresse email invalide.")
    try {
      setLoading(true)
      const res = await api.post("/auth/login", { email, password })
      const { access_token, user } = res.data
      localStorage.setItem("token", access_token)
      localStorage.setItem("user", JSON.stringify(user))
      onConnexion(user, access_token)
    } catch (err: any) {
      setErreur(err.response?.data?.message || "Erreur de connexion.")
    } finally {
      setLoading(false)
    }
  }

  // ── Register → appel API ──
  const handleRegister = async () => {
    if (!nom || !email || !password) return setErreur("Veuillez remplir tous les champs.")
    if (!emailValide(email)) return setErreur("Adresse email invalide.")
    try {
      setLoading(true)
      await api.post("/auth/register", { nom, email, password })
      setErreur("")
      alert("Compte créé ! Vous pouvez vous connecter.")
      changerPage("login")
    } catch (err: any) {
      setErreur(err.response?.data?.message || "Erreur lors de l'inscription.")
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    if (!email) return setErreur("Veuillez entrer votre email.")
    if (!emailValide(email)) return setErreur("Adresse email invalide.")
    alert(`Lien de réinitialisation envoyé à ${email}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-md bg-white border border-blue-200 rounded-2xl shadow-lg p-6 space-y-5">
        <h1 className="text-3xl font-bold text-center text-blue-800 bg-blue-100 border border-blue-300 rounded-xl py-2">
          Authentification
        </h1>

        {erreur && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
            {erreur}
          </div>
        )}

        {/* ── LOGIN ── */}
        {page === "login" && (
          <div className="space-y-4">
            <div>
              <input type="email" placeholder="exemple@gmail.com" value={email}
                onChange={(e) => { setEmail(e.target.value); setErreur("") }}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 ${
                  email.length > 0 && !emailValide(email) ? "border-red-400" : "border-blue-200"
                }`}
              />
              {email.length > 0 && !emailValide(email) && (
                <p className="text-red-400 text-xs mt-1">❌ Adresse email invalide</p>
              )}
              {email.length > 0 && emailValide(email) && (
                <p className="text-green-500 text-xs mt-1">✅ Email valide</p>
              )}
            </div>

            <ChampMotDePasse
              value={password}
              onChange={(val) => { setPassword(val); setErreur("") }}
              visible={showPassLogin}
              onToggle={() => setShowPassLogin(v => !v)}
            />

            <button onClick={handleLogin} disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50">
              {loading ? "Connexion..." : "Se connecter"}
            </button>

            <div className="flex justify-between text-sm">
              <p onClick={() => changerPage("inscription")}
                className="text-blue-600 cursor-pointer hover:underline">Créer un compte</p>
              <p onClick={() => changerPage("reset")}
                className="text-blue-600 cursor-pointer hover:underline">Mot de passe oublié ?</p>
            </div>
          </div>
        )}

        {/* ── INSCRIPTION ── */}
        {page === "inscription" && (
          <div className="space-y-4">
            <input type="text" placeholder="Nom complet" value={nom}
              onChange={(e) => { setNom(e.target.value); setErreur("") }}
              className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <div>
              <input type="email" placeholder="exemple@gmail.com" value={email}
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

            <ChampMotDePasse
              placeholder="Mot de passe fort"
              value={password}
              onChange={(val) => { setPassword(val); setErreur(""); setShowConditions(true) }}
              visible={showPassReg}
              onToggle={() => setShowPassReg(v => !v)}
              showForce showConds showCondsVisible={showConditions}
            />

            <button onClick={handleRegister} disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50">
              {loading ? "Inscription..." : "S'inscrire"}
            </button>

            <p onClick={() => changerPage("login")}
              className="text-center text-sm text-blue-600 cursor-pointer hover:underline">
              Déjà un compte ? Se connecter
            </p>
          </div>
        )}

        {/* ── RESET ── */}
        {page === "reset" && (
          <div className="space-y-4">
            <div>
              <input type="email" placeholder="exemple@gmail.com" value={email}
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