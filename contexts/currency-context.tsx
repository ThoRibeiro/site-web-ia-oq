"use client"

import type React from "react"

import { createContext, useEffect, useState } from "react"

type CurrencyCode = "USD" | "EUR" | "GBP" | "BTC" | "ETH"

interface CurrencyContextType {
  currency: CurrencyCode
  setCurrency: (currency: CurrencyCode) => void
  currencySymbol: string
}

export const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  setCurrency: () => {},
  currencySymbol: "$",
})

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>("USD")

  useEffect(() => {
    // Load from localStorage if available
    const savedCurrency = localStorage.getItem("currency") as CurrencyCode
    if (savedCurrency && ["USD", "EUR", "GBP", "BTC", "ETH"].includes(savedCurrency)) {
      setCurrency(savedCurrency)
    }
  }, [])

  useEffect(() => {
    // Save to localStorage when changed
    localStorage.setItem("currency", currency)
  }, [currency])

  const getCurrencySymbol = (code: CurrencyCode): string => {
    switch (code) {
      case "USD":
        return "$"
      case "EUR":
        return "€"
      case "GBP":
        return "£"
      case "BTC":
        return "₿"
      case "ETH":
        return "Ξ"
      default:
        return "$"
    }
  }

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        currencySymbol: getCurrencySymbol(currency),
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}
