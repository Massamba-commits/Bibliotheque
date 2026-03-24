import { type Livre } from "./data"

type ModalConditionsProps = {
  livre: Livre
  conditionAcceptee: boolean
  setConditionAcceptee: (v: boolean) => void
  onAccepter: () => void
  onAnnuler: () => void
}

export default function ModalConditions({
  livre,
  conditionAcceptee,
  setConditionAcceptee,
  onAccepter,
  onAnnuler,
}: ModalConditionsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">📋</div>
          <h2 className="text-xl font-bold text-gray-800">Conditions d'emprunt</h2>
          <p className="text-blue-500 text-sm mt-1 font-medium">"{livre.titre}"</p>
        </div>
        <div className="bg-blue-50 rounded-2xl p-4 mb-6 space-y-3 text-sm text-gray-700">
          {[
            "📅 La durée d'emprunt est de 14 jours maximum.",
            "🔄 Le renouvellement est possible une seule fois.",
            "💰 Tout retard entraîne une pénalité de 100 FCFA/jour.",
            "📖 Le livre doit être retourné en bon état.",
            "🚫 Le prêt est strictement personnel et non cessible.",
          ].map((condition) => (
            <div key={condition} className="flex items-start gap-2">
              <span>{condition}</span>
            </div>
          ))}
        </div>
        <label className="flex items-center gap-3 cursor-pointer mb-6 bg-gray-50 rounded-xl p-4">
          <input
            type="checkbox"
            checked={conditionAcceptee}
            onChange={(e) => setConditionAcceptee(e.target.checked)}
            className="w-5 h-5 accent-blue-500 cursor-pointer"
          />
          <span className="text-sm text-gray-700 font-medium">
            J'ai lu et j'accepte les conditions d'emprunt
          </span>
        </label>
        <button onClick={onAccepter} disabled={!conditionAcceptee}
          className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
            conditionAcceptee ? "bg-blue-500 hover:bg-blue-600 cursor-pointer" : "bg-gray-300 cursor-not-allowed"
          }`}>
          ✅ Confirmer l'emprunt
        </button>
        <button onClick={onAnnuler}
          className="w-full mt-3 py-3 rounded-xl font-medium text-gray-500 hover:bg-gray-100 transition-all">
          Annuler
        </button>
      </div>
    </div>
  )
}