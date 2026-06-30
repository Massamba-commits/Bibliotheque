import { useState, useEffect } from "react"
import api from "./api"

type Emprunt = {
  id: number
  livre: { id: number; titre: string; auteur: string; genre: string; image: string }
  dateEmprunt: string
  dateRetourPrevue: string
  dateRetourEffective?: string
  statut: "en_cours" | "en_retard" | "retourne"
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit", month: "2-digit", year: "numeric",
  })
}

function BadgeStatut({ statut }: { statut: Emprunt["statut"] }) {
  const styles = {
    en_cours:  "bg-blue-100 text-blue-700",
    en_retard: "bg-red-100 text-red-700",
    retourne:  "bg-green-100 text-green-700",
  }
  const labels = {
    en_cours:  "En cours",
    en_retard: "En retard",
    retourne:  "Retourné",
  }
  return (
    <span className={`text-xs font-bold px-3 py-1 rounded-full ${styles[statut]}`}>
      {labels[statut]}
    </span>
  )
}

export default function MesEmprunts() {
  const [emprunts, setEmprunts]   = useState<Emprunt[]>([])
  const [loading, setLoading]     = useState(true)
  const [onglet, setOnglet]       = useState<"encours" | "historique">("encours")

  useEffect(() => {
    api.get("/emprunts/mes-emprunts")
      .then(res => setEmprunts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const retourner = async (id: number) => {
    try {
      await api.patch(`/emprunts/${id}/retourner`)
      setEmprunts(prev =>
        prev.map(e => e.id === id
          ? { ...e, statut: "retourne", dateRetourEffective: new Date().toISOString() }
          : e
        )
      )
    } catch (err) {
      console.error(err)
    }
  }

  const enCours    = emprunts.filter(e => e.statut !== "retourne")
  const historique = emprunts.filter(e => e.statut === "retourne")
  const enRetard   = emprunts.filter(e => e.statut === "en_retard")

  if (loading) return (
    <div className="flex items-center justify-center py-20 text-gray-400">
      Chargement...
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-black text-gray-800">📚 Mes emprunts</h2>
      <p className="text-gray-500 mt-1 text-sm mb-6">Suivi de vos emprunts</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "En cours",  value: enCours.length,    color: "from-blue-500 to-blue-600"       },
          { label: "En retard", value: enRetard.length,   color: "from-rose-500 to-rose-600"       },
          { label: "Retournés", value: historique.length, color: "from-emerald-400 to-emerald-600" },
        ].map(s => (
          <div key={s.label}
            className={`bg-gradient-to-br ${s.color} rounded-2xl p-4 text-white shadow`}>
            <p className="text-3xl font-black">{s.value}</p>
            <p className="text-sm opacity-80 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Alerte retard */}
      {enRetard.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5 text-sm text-red-700 font-semibold">
          ⚠️ {enRetard.length === 1
            ? "1 livre est en retard."
            : `${enRetard.length} livres sont en retard.`}
        </div>
      )}

      {/* Onglets */}
      <div className="flex gap-2 mb-5">
        {(["encours", "historique"] as const).map((tab) => (
          <button key={tab} onClick={() => setOnglet(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
              onglet === tab
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-500 border-gray-200 hover:border-blue-300"
            }`}>
            {tab === "encours" ? `En cours (${enCours.length})` : `Historique (${historique.length})`}
          </button>
        ))}
      </div>

      {/* Liste */}
      <div className="space-y-3">
        {(onglet === "encours" ? enCours : historique).map(e => (
          <div key={e.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
            <img src={e.livre.image} alt={e.livre.titre}
              className="w-12 h-16 object-cover rounded-lg shadow-sm flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-800 truncate">{e.livre.titre}</p>
              <p className="text-gray-500 text-sm">{e.livre.auteur}</p>
              <div className="flex flex-wrap gap-x-4 mt-1">
                <span className="text-xs text-gray-400">
                  Emprunté le <span className="font-semibold text-gray-600">{formatDate(e.dateEmprunt)}</span>
                </span>
                {e.dateRetourEffective ? (
                  <span className="text-xs text-gray-400">
                    Retourné le <span className="font-semibold text-green-600">{formatDate(e.dateRetourEffective)}</span>
                  </span>
                ) : (
                  <span className={`text-xs ${e.statut === "en_retard" ? "text-red-500 font-bold" : "text-gray-400"}`}>
                    À retourner le{" "}
                    <span className={`font-semibold ${e.statut === "en_retard" ? "text-red-600" : "text-gray-600"}`}>
                      {formatDate(e.dateRetourPrevue)}
                    </span>
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <BadgeStatut statut={e.statut} />
              {e.statut !== "retourne" && (
                <button onClick={() => retourner(e.id)}
                  className="text-xs px-3 py-1.5 rounded-lg border-2 border-blue-500 text-blue-600 font-semibold hover:bg-blue-500 hover:text-white transition-all">
                  ↩ Retourner
                </button>
              )}
            </div>
          </div>
        ))}

        {(onglet === "encours" ? enCours : historique).length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-3">{onglet === "encours" ? "📭" : "📂"}</div>
            <p>{onglet === "encours" ? "Aucun emprunt en cours." : "Aucun historique."}</p>
          </div>
        )}
      </div>
    </div>
  )
}