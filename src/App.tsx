import { useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { type Utilisateur } from "./data"
import AuthPage from "./authentification"
import Navbar from "./Navbar"
import Dashboard from "./Dashboard"
import Livres from "./Livres"


export default function App() {
  const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null)
  if (!utilisateur) return <AuthPage onConnexion={setUtilisateur} />
  return (
    <BrowserRouter basename="/Bibliotheque/">
      <div className="min-h-screen bg-gray-100">
        <Navbar utilisateur={utilisateur} onDeconnexion={() => setUtilisateur(null)} />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/livres" element={<Livres />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}