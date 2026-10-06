<script setup lang="ts">
import type { Product } from '#shared/types/product'

defineProps<{
  product: Product
}>()

const { add } = useCart()
</script>

<template>
  <article class="card">
    <img :src="product.image" :alt="product.name" class="card__image" width="300" height="300" loading="lazy">
    <h2 class="card__title">
      <NuxtLink :to="`/products/${product.slug}`">{{ product.name }}</NuxtLink>
    </h2>
    <p class="card__price">{{ formatPrice(product.priceCents) }}</p>
    <p v-if="product.stock === 0" class="card__stock">Épuisé</p>
    <div
      v-else
      class="card__add"
      @click="add(product)"
    >
      Ajouter au panier
    </div>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
}
.card__image {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 4px;
  background: var(--surface);
}
.card__title {
  font-size: 1rem;
  margin: 0;
}
.card__title a {
  color: inherit;
  text-decoration: none;
}
.card__add {
  margin-top: auto;
  padding: 0.5rem;
  border-radius: 6px;
  background: var(--accent);
  color: #fff;
  text-align: center;
  cursor: pointer;
}
.card__price {
  font-weight: 600;
  margin: 0;
}
.card__stock {
  color: var(--danger);
  margin: 0;
}
</style>
