<script setup lang="ts">
const { public: { siteName } } = useRuntimeConfig()
const { count, isOpen } = useCart()
</script>

<template>
  <div class="layout">
    <header class="header">
      <NuxtLink to="/" class="header__logo">{{ siteName }}</NuxtLink>
      <SearchAutocomplete />
      <button class="header__cart" @click="isOpen = true">
        Panier <span class="header__badge">{{ count }}</span>
      </button>
    </header>

    <CartDrawer v-if="isOpen" />

    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <p>© {{ siteName }}</p>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--border);
}
.header__logo {
  font-weight: 700;
  font-size: 1.25rem;
  text-decoration: none;
  color: inherit;
}
.header__cart {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: #fff;
}
.header__badge {
  min-width: 1.5rem;
  padding: 0 0.4rem;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  font-size: 0.75rem;
  line-height: 1.5rem;
}
.main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
.footer {
  padding: 1rem 2rem;
  border-top: 1px solid var(--border);
  color: var(--muted);
}
</style>
