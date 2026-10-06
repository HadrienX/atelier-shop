<script setup lang="ts">
import type { CartItem } from '#shared/types/cart'

const props = defineProps<{
  item: CartItem
}>()

const emit = defineEmits<{
  update: [quantity: number]
  remove: []
}>()

const quantity = ref(props.item.quantity)

watch(quantity, (value) => {
  emit('update', value)
})
</script>

<template>
  <div class="line">
    <NuxtLink :to="`/products/${item.slug}`" class="line__name">
      {{ item.name }}
    </NuxtLink>

    <input v-model.number="quantity" type="number" min="1" class="line__quantity">

    <span class="line__price">{{ (item.price * quantity).toFixed(2) }} €</span>

    <span class="line__remove" @click="emit('remove')">Retirer</span>
  </div>
</template>

<style scoped>
.line {
  display: grid;
  grid-template-columns: 1fr 4rem 5rem auto;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border);
}
.line__name {
  color: inherit;
}
.line__quantity {
  width: 100%;
}
.line__price {
  text-align: right;
}
.line__remove {
  color: var(--danger);
  font-size: 0.875rem;
  cursor: pointer;
}
</style>
