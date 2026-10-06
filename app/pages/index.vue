<script setup lang="ts">
import type { ProductListResponse } from '#shared/types/product'
import type { Filters } from '~/components/ProductFilters.vue'

useHead({ title: 'Catalogue' })

const filters = ref<Filters>({
  category: '',
  maxPrice: null,
  sort: 'createdAt',
  order: 'desc',
})

const { data, status, error } = await useFetch<ProductListResponse>('/api/products', {
  query: filters,
})
</script>

<template>
  <section>
    <h1>Catalogue</h1>

    <ProductFilters :filters="filters" />

    <p v-if="error" role="alert">Impossible de charger le catalogue.</p>
    <p v-else-if="status === 'pending'">Chargement…</p>

    <template v-else>
      <p class="count">{{ data?.total }} pièce(s)</p>
      <ul class="grid">
        <li v-for="product in data?.items" :key="product.id">
          <ProductCard :product="product" />
        </li>
      </ul>
    </template>
  </section>
</template>

<style scoped>
.count {
  color: var(--muted);
}
.grid {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}
</style>
