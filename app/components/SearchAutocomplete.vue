<script setup lang="ts">
import type { Product } from '#shared/types/product'

const query = ref('')
const results = ref<Product[]>([])
const isOpen = ref(false)

watch(query, async (value) => {
  if (value.trim().length < 2) {
    results.value = []
    return
  }

  results.value = await $fetch<Product[]>('/api/search', { query: { q: value } })
  isOpen.value = true
})
</script>

<template>
  <div class="search">
    <input
      v-model="query"
      type="search"
      class="search__input"
      placeholder="Rechercher une pièce…"
      @focus="isOpen = true"
      @blur="isOpen = false"
    >

    <ul v-if="isOpen && results.length" class="search__results">
      <li v-for="product in results" :key="product.id">
        <NuxtLink :to="`/products/${product.slug}`" class="search__result">
          {{ product.name }}
          <span class="search__price">{{ formatPrice(product.priceCents) }}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.search {
  position: relative;
  flex: 1;
  max-width: 360px;
}
.search__input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 999px;
}
.search__results {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 10;
  list-style: none;
  margin: 0;
  padding: 0.25rem 0;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.08);
}
.search__result {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  color: inherit;
  text-decoration: none;
}
.search__result:hover {
  background: var(--surface);
}
.search__price {
  color: var(--muted);
}
</style>
