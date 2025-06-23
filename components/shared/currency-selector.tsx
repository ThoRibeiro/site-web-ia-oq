"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCurrency } from "@/hooks/use-currency"
import { ChevronDown } from "lucide-react"

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency()

  const currencies = [
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "GBP", symbol: "£" },
    { code: "BTC", symbol: "₿" },
    { code: "ETH", symbol: "Ξ" },
  ]

  const selectedCurrency = currencies.find((c) => c.code === currency) || currencies[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="mr-4 h-8 w-20">
          <span>
            {selectedCurrency.symbol} {selectedCurrency.code}
          </span>
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {currencies.map((c) => (
          <DropdownMenuItem key={c.code} onClick={() => setCurrency(c.code)} className="cursor-pointer">
            {c.symbol} {c.code}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
