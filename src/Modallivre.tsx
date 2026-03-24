import type { Livre } from "./data"

type Props = {
  livre: Livre
  onFermer: () => void
  onEmprunter: () => void  // ← ajouté
}

export default function Modallivre({ livre, onFermer, onEmprunter }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4" onClick={onFermer}>
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8" onClick={(e) => e.stopPropagation()}>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{livre.titre}</h2>
          <p className="text-gray-500">{livre.auteur}</p>
        </div>
        <div className="space-y-3 mb-6">
          {[
            { label: "Genre", valeur: livre.genre },
            { label: "Année", valeur: livre.annee },
            { label: "Statut", valeur: livre.disponible ? "✅ Disponible" : "🔖 Emprunté" },
          ].map((info) => (
            <div key={info.label} className="flex justify-between bg-amber-50 rounded-xl px-4 py-3">
              <span className="text-gray-500 text-sm">{info.label}</span>
              <span className="font-medium text-gray-800 text-sm">{info.valeur}</span>
            </div>
          ))}
        </div>
        <button
          disabled={!livre.disponible}
          onClick={onEmprunter}  // ← ajouté
          className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
            livre.disponible ? "bg-amber-600 hover:bg-amber-700 cursor-pointer" : "bg-gray-300 cursor-not-allowed"
          }`}>
          {livre.disponible ? "📖 Emprunter ce livre" : "Indisponible"}
        </button>
        <button onClick={onFermer} className="w-full mt-3 py-3 rounded-xl font-medium text-gray-500 hover:bg-gray-100 transition-all">
          Fermer
        </button>
      </div>
    </div>
  )
}