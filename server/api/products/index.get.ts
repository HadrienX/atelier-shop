import { products } from '../../data/products'
import type { ProductListResponse } from '#shared/types/product'

type SortKey = 'priceCents' | 'createdAt' | 'name'

interface ProductQuery {
  category?: string
  maxPrice?: string
  sort?: SortKey
  order?: 'asc' | 'desc'
}

export default defineEventHandler((event): ProductListResponse => {
  const { category, maxPrice, sort = 'createdAt', order = 'desc' } = getQuery(event) as ProductQuery

  let items = products

  if (category) {
    items = items.filter(product => product.category === category)
  }

  if (maxPrice) {
    items = items.filter(product => product.priceCents <= Number(maxPrice) * 100)
  }

  const direction = order === 'asc' ? 1 : -1
  items.sort((a, b) => (a[sort] > b[sort] ? direction : -direction))

  return {
    items,
    total: items.length,
  }
})
