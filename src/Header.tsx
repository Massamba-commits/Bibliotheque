import { type Utilisateur } from "./data"

type Props = {
  utilisateur: Utilisateur
  onDeconnexion: () => void
}

export default function Header({ utilisateur, onDeconnexion }: Props) {
  return (
    <header className="bg-blue-400 text-blue-50 py-6 px-6 shadow-lg">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <span className="text-4xl">📚</span>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Bibliothèque Nationale
            </h1>
            <p className="text-white text-sm">
              Votre espace de lecture et de découverte
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-amber-200 text-sm hidden md:block">
            👤 {utilisateur.nom}
          </span>

          <button
            onClick={onDeconnexion}
            className="bg-red-600 hover:bg-red-400 text-white text-sm px-4 py-2 rounded-xl transition-all"
          >
            Déconnexion
          </button>
        </div>

      </div>
    </header>
  )
}