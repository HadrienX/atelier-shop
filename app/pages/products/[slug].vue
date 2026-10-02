<script setup lang="ts">
import type { Product } from '#shared/types/product'

const route = useRoute()
const { add, isOpen } = useCart()

const { data: product } = await useFetch<Product>(() => `/api/products/${route.params.slug}`)

useHead({ title: () => product.value?.name ?? 'Produit' })

const quantity = ref(1)

const deliveryDate = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + 3)
  return date.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })
})

function addToCart() {
  add(product.value!, quantity.value)
  isOpen.value = true
}
</script>

<template>
  <article v-if="product" class="product">
    <img :src="product.image" class="product__image" width="600" height="600">

    <div class="product__info">
      <NuxtLink to="/" class="product__back">← Retour au catalogue</NuxtLink>
      <h1>{{ product.name }}</h1>
      <p class="product__price">{{ formatPrice(product.priceCents) }}</p>
      <p class="product__shipping">
        {{ product.priceCents >= 6000 ? 'Livraison offerte' : 'Livraison offerte dès 60 € d’achat' }}
      </p>
      <p v-if="product.stock > 0" class="product__delivery">
        Commandez aujourd’hui, livré le {{ deliveryDate }}
      </p>
      <div class="product__description" v-html="product.description" />

      <p v-if="product.stock === 0" class="product__stock">Épuisé</p>
      <form v-else class="product__form" @submit.prevent="addToCart">
        <label>
          Quantité
          <input v-model.number="quantity" type="number" min="1">
        </label>
        <button type="submit">Ajouter au panier</button>
      </form>
    </div>
  </article>
</template>

<style scoped>
.product {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
.product__image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  background: var(--surface);
}
.product__back {
  color: var(--muted);
}
.product__price {
  font-size: 1.5rem;
  font-weight: 600;
}
.product__shipping {
  color: var(--muted);
}
.product__delivery {
  font-size: 0.875rem;
}
.product__stock {
  color: var(--danger);
}
.product__form {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
}
.product__form button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  background: var(--accent);
  color: #fff;
}
</style>
