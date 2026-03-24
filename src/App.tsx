import { useState } from "react"
import { type Livre, type Utilisateur , livres, genres } from "./data"
import AuthPage from "./AuthPage"
import Header from "./header"
import Stats from "./Stats" 
import CarteLivre from './Cartelivre';
import Modallivre from "./Modallivre";

// ─── App 
export default function App() {
  const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null)
  const [recherche, setRecherche] = useState("")
  const [genreSelectionne, setGenreSelectionne] = useState("Tous")
  const [livreSelectionne, setLivreSelectionne] = useState<Livre | null>(null)

  if (!utilisateur) return <AuthPage onConnexion={setUtilisateur} />

  const livresFiltres = livres.filter((l) =>
    (l.titre.toLowerCase().includes(recherche.toLowerCase()) || l.auteur.toLowerCase().includes(recherche.toLowerCase())) &&
    (genreSelectionne === "Tous" || l.genre === genreSelectionne)
  )

  return (
    <div className="min-h-screen bg-blue-300 font-serif">
      <Header utilisateur={utilisateur} onDeconnexion={() => setUtilisateur(null)} />
      <main className="max-w-5xl mx-auto px-6 py-10">

        {/* Recherche */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-blue-300">
          <div className="flex flex-col md:flex-row gap-4">
            <input type="text" placeholder="Rechercher un livre ou un auteur..." value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              className="flex-1 border-2 border-blue-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-400 bg-blue-300" />
            <select value={genreSelectionne} onChange={(e) => setGenreSelectionne(e.target.value)}
              className="border-2 border-blue-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-300 bg-blue-50">
              {genres.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>

        <Stats />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {livresFiltres.map((livre) => (
            <CarteLivre key={livre.id} livre={livre} onClick={setLivreSelectionne} />
          ))}
        </div>

        {livresFiltres.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4"></div>
            <p className="text-lg">Aucun livre trouvé</p>
          </div>
        )}
      </main>

      {livreSelectionne && <Modallivre livre={livreSelectionne} onFermer={() => setLivreSelectionne(null)} />}
    </div>
  )
}