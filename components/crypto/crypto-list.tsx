"use client"

import { useEffect, useState } from "react"
import { CryptoCard } from "./crypto-card"
import { CryptoTable } from "./crypto-table"
import { Button } from "@/components/ui/button"
import { Grid2X2, List } from "lucide-react"
import { Input } from "@/components/ui/input"
import { fetchCryptos } from "@/lib/api/coingecko"
import { Skeleton } from "@/components/ui/skeleton"
import { useCurrency } from "@/hooks/use-currency"

export function CryptoList() {
  const [view, setView] = useState<"grid" | "list">("list")
  const [search, setSearch] = useState("")
  const [cryptos, setCryptos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { currency } = useCurrency()

  useEffect(() => {
    const loadCryptos = async () => {
      setLoading(true)
      try {
        const data = await fetchCryptos(currency)
        setCryptos(data)
      } catch (error) {
        console.error("Erreur lors du chargement des cryptos:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCryptos()
  }, [currency])

  const filteredCryptos = cryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(search.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-96">
          <Input
            type="text"
            placeholder="Rechercher une crypto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-900"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant={view === "list" ? "default" : "outline"} size="icon" onClick={() => setView("list")}>
            <List className="h-4 w-4" />
          </Button>
          <Button variant={view === "grid" ? "default" : "outline"} size="icon" onClick={() => setView("grid")}>
            <Grid2X2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {loading ? (
        view === "grid" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
              ))}
          </div>
        ) : (
          <Skeleton className="h-[500px] w-full rounded-xl" />
        )
      ) : view === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCryptos.map((crypto) => (
            <CryptoCard key={crypto.id} crypto={crypto} />
          ))}
        </div>
      ) : (
        <CryptoTable cryptos={filteredCryptos} />
      )}
    </div>
  )
}
