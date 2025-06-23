"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Globe, Menu, X } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { UserNav } from "./user-nav"
import { CurrencySelector } from "./currency-selector"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth()

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Comparateur", href: "/compare" },
    { name: "Événements", href: "/events" },
    { name: "Résumé Hebdo", href: "/weekly-summary" },
    { name: "Découvrir", href: "/discover" },
  ]

  const userNavigation = [
    { name: "Portefeuille", href: "/portfolio" },
    { name: "Watchlist", href: "/watchlist" },
    { name: "Alertes", href: "/alerts" },
  ]

  return (
    <header className="border-b border-gray-800 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Globe className="mr-2 h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold">crypto.com</span>
            </Link>
            <nav className="ml-10 hidden space-x-4 md:flex">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === item.href
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden items-center md:flex">
            <CurrencySelector />
            {user ? (
              <>
                <nav className="mr-4 flex space-x-4">
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`rounded-md px-3 py-2 text-sm font-medium ${
                        pathname === item.href
                          ? "bg-gray-800 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <UserNav />
              </>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" asChild>
                  <Link href="/login">Connexion</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Inscription</Link>
                </Button>
              </div>
            )}
          </div>

          <div className="flex md:hidden">
            <button type="button" className="text-gray-400 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span className="sr-only">Ouvrir le menu</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  pathname === item.href ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {user &&
              userNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    pathname === item.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            {!user && (
              <div className="mt-4 flex flex-col space-y-2 px-3">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    Connexion
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                    Inscription
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
