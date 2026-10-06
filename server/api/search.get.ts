import { products } from '../data/products'

export default defineEventHandler((event) => {
  const q = String(getQuery(event).q ?? '').trim().toLowerCase()

  if (!q) {
    return []
  }

  return products
    .filter(product => product.name.toLowerCase().includes(q))
    .slice(0, 8)
})
