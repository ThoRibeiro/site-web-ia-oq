"use client"

import { CurrencyContext } from "@/contexts/currency-context"
import { useContext } from "react"

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}
