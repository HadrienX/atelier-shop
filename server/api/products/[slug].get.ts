import { products } from '../../data/products'

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')

  return products.find(product => product.slug === slug)
})
