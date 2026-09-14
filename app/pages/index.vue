<script setup lang="ts">
import type { ProductListResponse } from '#shared/types/product'

useHead({ title: 'Catalogue' })

const { data, status, error } = await useFetch<ProductListResponse>('/api/products')
</script>

<template>
  <section>
    <h1>Catalogue</h1>

    <p v-if="error" role="alert">Impossible de charger le catalogue.</p>
    <p v-else-if="status === 'pending'">Chargement…</p>

    <ul v-else class="grid">
      <li v-for="product in data?.items" :key="product.id">
        <ProductCard :product="product" />
      </li>
    </ul>
  </section>
</template>

<style scoped>
.grid {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}
</style>
