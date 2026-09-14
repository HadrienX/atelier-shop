const formatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })

/** Formate un montant exprimé en centimes. */
export function formatPrice(cents: number): string {
  return formatter.format(cents / 100)
}
