import { livres } from "./data"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts"

// ─── Données pour les graphiques 
const statParGenre = Object.entries(
  livres.reduce((acc, l) => {
    acc[l.genre] = (acc[l.genre] || 0) + 1
    return acc
  }, {} as Record<string, number>)
).map(([genre, count]) => ({ genre, count }))

const statDispo = [
  { name: "Disponibles", value: livres.filter((l) => l.disponible).length },
  { name: "Empruntés", value: livres.filter((l) => !l.disponible).length },
]

const COLORS = ["#3b82f6", "#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"]
const COLORS_PIE = ["#10b981", "#ef4444"]

// ─── Carte stat 
function CarteStat({
  icon, label, valeur, bg, text
}: {
  icon: string; label: string; valeur: number; bg: string; text: string
}) {
  return (
    <div className={`${bg} rounded-2xl p-6 text-white shadow-lg`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-4xl">{icon}</span>
        <span className={`text-xs px-3 py-1 rounded-full bg-white/20 ${text}`}>Total</span>
      </div>
      <div className="text-4xl font-black mb-1">{valeur}</div>
      <div className="text-sm opacity-80 font-medium">{label}</div>
    </div>
  )
}

// Dashboard 
export default function Dashboard() {
  const livresRecents = [...livres].slice(0, 3)

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">

      {/* Titre */}
      <div className="mb-8">
        <h2 className="text-2xl font-black text-gray-800">Tableau de bord SENBibliothéque |||</h2>
        <p className="text-gray-500 mt-1">Vue d'ensemble de la bibliothèque</p>
      </div>

      {/* Cartes stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <CarteStat icon="" label="Total des livres" valeur={livres.length}
          bg="bg-gradient-to-br from-blue-500 to-blue-700" text="text-white" />
        <CarteStat icon="" label="Livres disponibles" valeur={livres.filter(l => l.disponible).length}
          bg="bg-gradient-to-br from-emerald-400 to-emerald-600" text="text-white" />
        <CarteStat icon="🔖" label="Livres empruntés" valeur={livres.filter(l => !l.disponible).length}
          bg="bg-gradient-to-br from-rose-400 to-rose-600" text="text-white" />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

        {/* Bar chart genres */}
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📊Livres par genre</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={statParGenre}>
              <XAxis dataKey="genre" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {statParGenre.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart dispo */}
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Disponibilité</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={statDispo}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={5}
                dataKey="value"
              >
                {statDispo.map((_, i) => (
                  <Cell key={i} fill={COLORS_PIE[i]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Livres récents */}
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">🆕 Livres récents</h3>
        <div className="space-y-3">
          {livresRecents.map((livre) => (
            <div key={livre.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all">
              <div className="flex items-center gap-4">
                <img src={livre.image} alt={livre.titre} className="w-12 h-14 object-cover rounded-lg shadow" />
                <div>
                  <p className="font-semibold text-gray-800">{livre.titre}</p>
                  <p className="text-gray-500 text-sm">{livre.auteur} · {livre.annee}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
                  {livre.genre}
                </span>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  livre.disponible ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                }`}>
                  {livre.disponible ? "Disponible" : "Emprunté"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}