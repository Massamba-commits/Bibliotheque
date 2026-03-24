import type { Livre } from "./data";
type Props = {
    livre: Livre
    onClick: (l: Livre) => void
}



export default function CarteLivre({ livre, onClick }: Props) {
  if (!livre) {
    return null
}
  return (
    <div onClick={() => onClick(livre)}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-blue-100 hover:border-blue-400 hover:-translate-y-1">
      <div className="bg-gradient-to-br from-blue-100 to-white rounded-t-2xl h-36 flex items-center justify-center text-6xl">
        <img src={livre.image} alt={livre.titre} className="w-110 h-36 rounded-t-2xl "/></div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h2 className="font-bold text-gray-800 text-lg leading-tight">{livre.titre}</h2>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ml-2 shrink-0 ${livre.disponible ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {livre.disponible ? "Disponible" : "Emprunté"}
          </span>
        </div>
        <p className="text-gray-500 text-sm">{livre.auteur}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full">{livre.genre}</span>
          <span className="text-gray-400 text-xs">{livre.annee}</span>
        </div>
      </div>
    </div>
  )
}
