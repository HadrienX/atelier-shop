import { products } from '../../data/products'
import type { ProductListResponse } from '#shared/types/product'

export default defineEventHandler((): ProductListResponse => {
  return {
    items: products,
    total: products.length,
  }
})
