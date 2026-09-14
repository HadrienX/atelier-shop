<script setup lang="ts">
const { public: { siteName } } = useRuntimeConfig()
</script>

<template>
  <div class="layout">
    <header class="header">
      <NuxtLink to="/" class="header__logo">{{ siteName }}</NuxtLink>
    </header>

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
