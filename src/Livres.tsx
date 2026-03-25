import { useState } from "react"
import { type Livre, livres as livresInitiaux, genres } from "./data"
import Modallivre from "./Modallivre"
import ModalCondition from "./Modalcondition"
import Cartelivre from "./Cartelivre"

export default function Livres() {
  const [listeLivres, setListeLivres] = useState<Livre[]>(livresInitiaux)
  const [recherche, setRecherche] = useState("")
  const [genreSelectionne, setGenreSelectionne] = useState("Tous")
  const [livreSelectionne, setLivreSelectionne] = useState<Livre | null>(null)
  const [afficherConditions, setAfficherConditions] = useState(false)
  const [conditionAcceptee, setConditionAcceptee] = useState(false)

  const livresFiltres = listeLivres.filter((l) =>
    (l.titre.toLowerCase().includes(recherche.toLowerCase()) ||
      l.auteur.toLowerCase().includes(recherche.toLowerCase())) &&
    (genreSelectionne === "Tous" || l.genre === genreSelectionne)
  )

  const emprunterLivre = () => {
    if (!livreSelectionne || !conditionAcceptee) return
    setListeLivres((prev) =>
      prev.map((l) => l.id === livreSelectionne.id ? { ...l, disponible: false } : l)
    )
    setLivreSelectionne(null)
    setAfficherConditions(false)
    setConditionAcceptee(false)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">

      {/* Titre */}
      <div className="mb-6">
        <h2 className="text-3xl font-black text-gray-800">Catalogue des livres📖</h2>
        <p className="text-gray-500 mt-1">{listeLivres.length} livres disponibles</p>
      </div>

      {/* Recherche */}
      <div className="bg-white rounded-2xl shadow p-5 mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="🔍  Rechercher un livre ou un auteur..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="flex-1 border-2 border-blue-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-500 bg-blue-50"
          />
          <select
            value={genreSelectionne}
            onChange={(e) => setGenreSelectionne(e.target.value)}
            className="border-2 border-blue-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-500 bg-blue-50"
          >
            {genres.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>

      {/* Grille livres */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {livresFiltres.map((livre) => (
          <Cartelivre key={livre.id} livre={livre} onClick={setLivreSelectionne} />
        ))}
      </div>

      {livresFiltres.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg">ce livre n'est pas disponible en ce moment dans la bibliotheque</p>
        </div>
      )}

      {/* Modal livre */}
      {livreSelectionne && !afficherConditions && (
        <Modallivre
          livre={livreSelectionne}
          onFermer={() => setLivreSelectionne(null)}
          onEmprunter={() => setAfficherConditions(true)}
        />
      )}

      {/* Modal conditions */}
      {afficherConditions && livreSelectionne && (
        <ModalCondition
          livre={livreSelectionne}
          conditionAcceptee={conditionAcceptee}
          setConditionAcceptee={setConditionAcceptee}
          onAccepter={emprunterLivre}
          onAnnuler={() => {
            setAfficherConditions(false)
            setConditionAcceptee(false)
          }}
        />
      )}
    </div>
  )
}