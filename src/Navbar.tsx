import { NavLink } from "react-router-dom"
import { type Utilisateur } from "./data"

type NavbarProps = {
  utilisateur: Utilisateur
  onDeconnexion: () => void
}

export default function Navbar({ utilisateur, onDeconnexion }: NavbarProps) {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
      isActive
        ? "bg-white text-blue-600 shadow"
        : "text-white hover:bg-white/20"
    }`

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">📚</span>
          <div>
            <h1 className="text-xl font-bold tracking-tight">SENBibliothèque</h1>
            <p className="text-blue-200 text-xs">keur xam-xam</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          <NavLink to="/dashboard" className={linkClass}>
        Dashboard
          </NavLink>
          <NavLink to="/livres" className={linkClass}>
            📖 Livres
          </NavLink>
        </nav>

        {/* Utilisateur */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold">{utilisateur.nom}</p>
            <p className="text-blue-200 text-xs">{utilisateur.email}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-white text-blue-600 font-bold flex items-center justify-center text-sm">
            {utilisateur.nom.charAt(0).toUpperCase()}
          </div>
          <button
            onClick={onDeconnexion}
            className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-2 rounded-xl transition-all font-semibold"
          >
            Déconnexion
          </button>
        </div>

      </div>
    </header>
  )
}