export type ProductCategory = 'bols' | 'assiettes' | 'plats' | 'tasses' | 'vases'

export interface Product {
  id: number
  slug: string
  name: string
  description: string
  category: ProductCategory
  /** Prix TTC en centimes d'euro (convention projet : jamais de flottants pour l'argent). */
  priceCents: number
  stock: number
  image: string
  createdAt: string
}

export interface ProductListResponse {
  items: Product[]
  total: number
}
