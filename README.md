# Atelier Céramique — boutique

Boutique en ligne Nuxt 4 (Vue 3, TypeScript).

## Démarrer

```bash
npm install
npm run dev
```

## Structure

- `app/` — code client (pages, composants, composables)
- `server/` — routes API Nitro (données mockées dans `server/data`)
- `shared/` — types partagés client / serveur

## Conventions

- Les montants sont **toujours** manipulés en centimes (`priceCents`), formatés uniquement à l'affichage via `formatPrice`.
- Les types métier vivent dans `shared/types` et sont partagés entre `app/` et `server/`.
- Le data fetching côté pages passe par `useFetch` / `useAsyncData` (pas de `$fetch` direct dans le `setup`).
