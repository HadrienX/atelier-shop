<script setup lang="ts">
const { items, isOpen, total, updateQuantity, remove, clear } = useCart()
const { code, discount, isValid } = usePromo()

const isSubmitting = ref(false)

const shipping = computed(() => (total.value >= 60 ? 0 : 4.9))
const remainingForFreeShipping = computed(() => 60 - total.value)
const finalTotal = computed(() => total.value * (1 - discount.value) + shipping.value)

function close() {
  isOpen.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    close()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

async function checkout() {
  isSubmitting.value = true

  try {
    const { redirectUrl } = await $fetch('/api/checkout', {
      method: 'POST',
      body: {
        items: items.value,
        promoCode: code.value,
        discount: discount.value,
      },
    })

    clear()
    window.location.href = redirectUrl
  }
  catch {
    alert('Le paiement a échoué, merci de réessayer.')
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="backdrop" @click.self="close">
    <aside class="drawer">
      <header class="drawer__header">
        <h2>Votre panier</h2>
        <span class="drawer__close" @click="close">✕</span>
      </header>

      <p v-if="!items.length">Votre panier est vide.</p>

      <template v-else>
        <CartLine
          v-for="(item, index) in items"
          :key="index"
          :item="item"
          @update="updateQuantity(item.productId, $event)"
          @remove="remove(item.productId)"
        />

        <label class="promo">
          Code promo
          <input v-model="code" type="text">
          <small v-if="isValid">-{{ discount * 100 }} % appliqué</small>
        </label>

        <p v-if="shipping > 0" class="drawer__shipping-hint">
          Plus que {{ remainingForFreeShipping.toFixed(2) }} € pour profiter de la livraison offerte
        </p>
        <p class="drawer__shipping">
          Livraison : {{ shipping === 0 ? 'offerte' : `${shipping.toFixed(2)} €` }}
        </p>

        <p class="drawer__total">
          Total : <strong>{{ finalTotal.toFixed(2) }} €</strong>
        </p>

        <button class="drawer__checkout" :disabled="isSubmitting" @click="checkout">
          {{ isSubmitting ? 'Redirection…' : 'Passer commande' }}
        </button>
      </template>
    </aside>
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgb(0 0 0 / 0.35);
}
.drawer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(420px, 100%);
  padding: 1.5rem;
  overflow-y: auto;
  background: #fff;
}
.drawer__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.drawer__close {
  cursor: pointer;
  font-size: 1.25rem;
}
.promo {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 1.5rem;
}
.drawer__shipping-hint {
  margin-top: 1.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  background: var(--surface);
  font-size: 0.875rem;
}
.drawer__shipping {
  margin-top: 1rem;
  color: var(--muted);
}
.drawer__total {
  margin-top: 1.5rem;
  font-size: 1.125rem;
}
.drawer__checkout {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  background: var(--accent);
  color: #fff;
}
</style>
