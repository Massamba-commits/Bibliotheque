import { useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AuthPage from "./authentification"
import Navbar from "./Navbar"
import Dashboard from "./Dashboard"
import Livres from "./Livres"
import MesEmprunts from "./MesEmprunts"

export default function App() {
  const [utilisateur, setUtilisateur] = useState<any>(
    JSON.parse(localStorage.getItem("user") || "null")
  )

  const handleConnexion = (user: any, token: string) => {
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
    setUtilisateur(user)
  }

  const handleDeconnexion = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUtilisateur(null)
  }

  if (!utilisateur) return <AuthPage onConnexion={handleConnexion} />

  return (
    <BrowserRouter basename="/Bibliotheque/">
      <div className="min-h-screen bg-gray-100">
        <Navbar utilisateur={utilisateur} onDeconnexion={handleDeconnexion} />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/livres" element={<Livres />} />
            <Route path="/mes-emprunts" element={<MesEmprunts  />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}