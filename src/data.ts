export type Livre = {
  id: number
  titre: string
  auteur: string
  genre: string
  annee: number
  disponible: boolean
  image: string 
}
export type Utilisateur = {
  nom: string
  email: string
  motDePasse: string
  livres: Livre[]
  
}

export const livres: Livre[] = [
  { id: 1, titre: "Une si longue lettre", auteur: "Mariama Bâ", genre: "Roman", annee: 1979, disponible: true, image: "/images/une si longue lettre.png" },
  { id: 2, titre: "Les Bouts de bois de Dieu", auteur: "Ousmane Sembène", genre: "Roman historique", annee: 1960, disponible: true, image: "/images/les_bouts_de_bois_de_dieu-.jpg" },
  { id: 3, titre: "L'Aventure ambiguë", auteur: "Cheikh Hamidou Kane", genre: "Philosophie", annee: 1961, disponible: true, image: "/images/laventure-ambigue.jpg" },
  { id: 4, titre: "Le Docker noir", auteur: "Ousmane Sembène", genre: "Roman", annee: 1956, disponible: false, image: "/images/le docker noir.jpg" },
  { id: 5, titre: "Xala", auteur: "Ousmane Sembène", genre: "Satire", annee: 1973, disponible: false, image: "/images/xala1.jpg" },
]

export const genres = ["Tous", "Roman", "Roman historique", "Philosophie", "Satire"]