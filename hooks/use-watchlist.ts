"use client"

import { useAuth } from "@/hooks/use-auth"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (user && isSupabaseConfigured()) {
      fetchWatchlist()
    } else {
      // If not logged in or Supabase not configured, try to get from localStorage
      const localWatchlist = localStorage.getItem("watchlist")
      if (localWatchlist) {
        try {
          setWatchlist(JSON.parse(localWatchlist))
        } catch (e) {
          setWatchlist([])
        }
      }
      setLoading(false)
    }
  }, [user])

  const fetchWatchlist = async () => {
    if (!user || !isSupabaseConfigured()) return

    try {
      setLoading(true)
      const { data, error } = await supabase.from("watchlists").select("crypto_data").eq("user_id", user.id)

      if (error) throw error

      if (data && data.length > 0) {
        setWatchlist(data[0].crypto_data || [])
      } else {
        // Create a new watchlist for the user
        await supabase.from("watchlists").insert({
          user_id: user.id,
          crypto_data: [],
        })
        setWatchlist([])
      }
    } catch (error: any) {
      console.error("Error fetching watchlist:", error.message)
    } finally {
      setLoading(false)
    }
  }

  const isInWatchlist = (cryptoId: string) => {
    return watchlist.some((item) => item.id === cryptoId)
  }

  const toggleWatchlist = async (crypto: any) => {
    const isAlreadyInWatchlist = isInWatchlist(crypto.id)
    let newWatchlist

    if (isAlreadyInWatchlist) {
      newWatchlist = watchlist.filter((item) => item.id !== crypto.id)
      toast({
        title: "Retiré de la watchlist",
        description: `${crypto.name} a été retiré de votre watchlist`,
      })
    } else {
      // Only keep essential data to avoid storing too much
      const cryptoData = {
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol,
        image: crypto.image,
        current_price: crypto.current_price,
        price_change_percentage_24h: crypto.price_change_percentage_24h,
      }
      newWatchlist = [...watchlist, cryptoData]
      toast({
        title: "Ajouté à la watchlist",
        description: `${crypto.name} a été ajouté à votre watchlist`,
      })
    }

    setWatchlist(newWatchlist)

    // Save to localStorage for non-logged in users or when Supabase is not configured
    if (!user || !isSupabaseConfigured()) {
      localStorage.setItem("watchlist", JSON.stringify(newWatchlist))
      return
    }

    // Save to database for logged in users
    try {
      const { error } = await supabase.from("watchlists").update({ crypto_data: newWatchlist }).eq("user_id", user.id)

      if (error) throw error
    } catch (error: any) {
      console.error("Error updating watchlist:", error.message)
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la watchlist",
        variant: "destructive",
      })
    }
  }

  return {
    watchlist,
    loading,
    isInWatchlist,
    toggleWatchlist,
    refreshWatchlist: fetchWatchlist,
  }
}
