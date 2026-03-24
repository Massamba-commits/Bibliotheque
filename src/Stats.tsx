import { livres } from "./data"
type Livre = {
    id: number;
    titre: string;
    auteur: string;
    genre: string;
    annee: number;
    disponible: boolean;
    image: string;
}
export default function Livre() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-10">
      {[
        { label: "Total livres", valeur: livres.length},
        { label: "Disponibles", valeur: livres.filter(l => l.disponible).length},
        { label: "Empruntés", valeur: livres.filter(l => !l.disponible).length },
      ].map((s) => (
        <div key={s.label} className="bg-white rounded-2xl shadow-sm p-5 text-center border border-blue-300">
          <div className="text-3xl mb-1"></div>
          <div className="text-3xl font-bold text-blue-500">{s.valeur}</div>
          <div className="text-xl text-gray-500">{s.label}</div>
        </div>
      ))}
    </div>
  )
}