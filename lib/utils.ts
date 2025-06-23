import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number, compact = false): string {
  if (value === null || value === undefined) {
    return "N/A"
  }

  if (compact) {
    // Format large numbers in a compact way (e.g., 1.2B, 45M)
    const formatter = Intl.NumberFormat("fr-FR", {
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 2,
    })
    return formatter.format(value)
  }

  // Format with appropriate decimal places based on value
  const formatter = Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: value < 1 ? 4 : value < 10 ? 2 : 0,
    maximumFractionDigits: value < 1 ? 6 : value < 10 ? 2 : 0,
  })
  return formatter.format(value)
}

export function calculateRiskScore(crypto: any): number {
  // This is a simplified risk calculation
  // In a real app, you would use more sophisticated metrics

  // Factors to consider:
  // 1. Volatility (price_change_percentage_24h)
  // 2. Market cap (lower market cap = higher risk)
  // 3. Volume to market cap ratio (lower ratio = higher risk)
  // 4. Age/history of the coin

  const volatilityFactor = Math.abs(crypto.price_change_percentage_24h) / 10 // 0-10% normalized to 0-1

  // Market cap factor (lower = higher risk)
  // Using log scale to normalize market caps
  const marketCapFactor = 1 - (Math.log10(crypto.market_cap) - 7) / 5 // Normalize between 0-1

  // Volume to market cap ratio (higher = lower risk)
  const volumeRatio = crypto.total_volume / crypto.market_cap
  const volumeFactor = 1 - Math.min(volumeRatio * 5, 1) // Normalize between 0-1

  // Combine factors with weights
  const riskScore = (volatilityFactor * 0.4 + marketCapFactor * 0.4 + volumeFactor * 0.2) * 100

  // Return a score between 0-100
  return Math.min(Math.max(Math.round(riskScore), 0), 100)
}

export function getTimeAgo(timestamp: string): string {
  const now = new Date()
  const date = new Date(timestamp)
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  let interval = Math.floor(seconds / 31536000)
  if (interval >= 1) {
    return interval === 1 ? "il y a 1 an" : `il y a ${interval} ans`
  }

  interval = Math.floor(seconds / 2592000)
  if (interval >= 1) {
    return interval === 1 ? "il y a 1 mois" : `il y a ${interval} mois`
  }

  interval = Math.floor(seconds / 86400)
  if (interval >= 1) {
    return interval === 1 ? "il y a 1 jour" : `il y a ${interval} jours`
  }

  interval = Math.floor(seconds / 3600)
  if (interval >= 1) {
    return interval === 1 ? "il y a 1 heure" : `il y a ${interval} heures`
  }

  interval = Math.floor(seconds / 60)
  if (interval >= 1) {
    return interval === 1 ? "il y a 1 minute" : `il y a ${interval} minutes`
  }

  return "à l'instant"
}
