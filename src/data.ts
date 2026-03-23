//Types
export type Livre = {
  id: number
  titre: string
  auteur: string
  genre: string
  annee: number
  disponible: boolean
  
}

export type Utilisateur = {
  nom: string
  email: string
}

export type PageAuth = "login" | "inscription" | "reinitialisation"
// Données
export const livres: Livre[] = [
  { id: 1, titre: "Une si longue lettre", auteur:"Mariama Ba", genre: "Roman", annee: 1979, disponible: true},
  { id: 2, titre: "Les Bouts de bois de Dieu", auteur: "Ousmane Sembene", genre: "Roman historique", annee: 1960, disponible: true },
  { id: 3, titre: "L'Étranger", auteur: "Albert Camus", genre: "Philosophie", annee: 1942, disponible: false },
  { id: 4, titre: "Harry Potter", auteur: "J.K. Rowling", genre: "Fantasy", annee: 1997, disponible: false},
  { id: 5, titre: "L'Aventure ambiguë", auteur: "Cheikh Hamidou Kane", genre: "Philosophie", annee: 1961, disponible: true},
  { id: 6, titre: "Dune", auteur: "Frank Herbert", genre: "Science-Fiction", annee: 1965, disponible: true},
]

export const genres = ["Tous", "Classique", "Roman", "Philosophie", "Fantasy", "Science-Fiction"]