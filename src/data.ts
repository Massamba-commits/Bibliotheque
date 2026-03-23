//Types
export type Livre = {
  id: number
  titre: string
  auteur: string
  genre: string
  annee: number
  disponible: boolean
  couverture: string
}

export type Utilisateur = {
  nom: string
  email: string
}

export type PageAuth = "login" | "inscription" | "reinitialisation"
