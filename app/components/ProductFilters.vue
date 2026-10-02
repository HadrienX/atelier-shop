<script setup lang="ts">
import type { ProductCategory } from '#shared/types/product'

export interface Filters {
  category: ProductCategory | ''
  maxPrice: number | null
  sort: 'createdAt' | 'priceCents' | 'name'
  order: 'asc' | 'desc'
}

const props = defineProps<{
  filters: Filters
}>()

const categories: { value: Filters['category'], label: string }[] = [
  { value: '', label: 'Toutes' },
  { value: 'bols', label: 'Bols' },
  { value: 'assiettes', label: 'Assiettes' },
  { value: 'tasses', label: 'Tasses' },
  { value: 'vases', label: 'Vases' },
]

function reset() {
  props.filters.category = ''
  props.filters.maxPrice = null
  props.filters.sort = 'createdAt'
  props.filters.order = 'desc'
}
</script>

<template>
  <form class="filters" @submit.prevent>
    <label class="filters__field">
      Catégorie
      <select v-model="filters.category">
        <option v-for="category in categories" :key="category.value" :value="category.value">
          {{ category.label }}
        </option>
      </select>
    </label>

    <label class="filters__field">
      Prix max (€)
      <input v-model.number="filters.maxPrice" type="number" min="0" step="0.01">
    </label>

    <label class="filters__field">
      Trier par
      <select v-model="filters.sort">
        <option value="createdAt">Nouveautés</option>
        <option value="priceCents">Prix</option>
        <option value="name">Nom</option>
      </select>
    </label>

    <label class="filters__field">
      Ordre
      <select v-model="filters.order">
        <option value="asc">Croissant</option>
        <option value="desc">Décroissant</option>
      </select>
    </label>

    <button type="button" class="filters__reset" @click="reset">
      Réinitialiser
    </button>
  </form>
</template>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 1rem;
  margin-bottom: 2rem;
}
.filters__field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--muted);
}
.filters__reset {
  background: none;
  border: none;
  color: var(--accent);
  text-decoration: underline;
}
</style>
