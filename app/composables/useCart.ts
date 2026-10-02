import type { Product } from '#shared/types/product'
import type { CartItem } from '#shared/types/cart'

const STORAGE_KEY = 'atelier-cart'

const items = ref<CartItem[]>([])
const isOpen = ref(false)

export function useCart() {
  if (import.meta.client && !items.value.length) {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      items.value = JSON.parse(saved) as CartItem[]
    }
  }

  const count = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))

  const total = computed(() => {
    const value = items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)

    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
    }

    return value
  })

  function add(product: Product, quantity = 1) {
    const existing = items.value.find(item => item.productId === product.id)

    if (existing) {
      existing.quantity += quantity
      return
    }

    items.value.push({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.priceCents / 100,
      quantity,
    })
  }

  function updateQuantity(productId: number, quantity: number) {
    const item = items.value.find(item => item.productId === productId)
    if (item) {
      item.quantity = quantity
    }
  }

  function remove(productId: number) {
    items.value = items.value.filter(item => item.productId !== productId)
  }

  function clear() {
    items.value = []
  }

  return {
    items,
    isOpen,
    count,
    total,
    add,
    updateQuantity,
    remove,
    clear,
  }
}
