const PROMO_CODES: Record<string, number> = {
  BIENVENUE10: 0.1,
  NEWSLETTER15: 0.15,
  ATELIER_STAFF50: 0.5,
}

export function usePromo() {
  const code = useState('promo-code', () => '')

  const discount = computed(() => PROMO_CODES[code.value.trim().toUpperCase()] ?? 0)
  const isValid = computed(() => discount.value > 0)

  return {
    code,
    discount,
    isValid,
  }
}
