<script setup lang="ts">
import type { Product } from '#shared/types/product'

defineProps<{
  product: Product
}>()
</script>

<template>
  <article class="card">
    <img :src="product.image" :alt="product.name" class="card__image" width="300" height="300" loading="lazy">
    <h2 class="card__title">{{ product.name }}</h2>
    <p class="card__price">{{ formatPrice(product.priceCents) }}</p>
    <p v-if="product.stock === 0" class="card__stock">Épuisé</p>
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
.card__price {
  font-weight: 600;
  margin: 0;
}
.card__stock {
  color: var(--danger);
  margin: 0;
}
</style>
