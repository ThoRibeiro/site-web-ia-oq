import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, Coins, Users, Zap } from "lucide-react"

export function StatsSection() {
  return (
    <section className="py-12">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-gray-800 bg-gray-900/50">
          <CardContent className="flex items-center p-6">
            <div className="mr-4 rounded-full bg-blue-500/10 p-3">
              <Coins className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Cryptomonnaies</p>
              <p className="text-2xl font-bold">400+</p>
            </div>
            <ArrowUpRight className="ml-auto h-5 w-5 text-green-500" />
          </CardContent>
        </Card>
        <Card className="border-gray-800 bg-gray-900/50">
          <CardContent className="flex items-center p-6">
            <div className="mr-4 rounded-full bg-green-500/10 p-3">
              <Users className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Utilisateurs</p>
              <p className="text-2xl font-bold">140M+</p>
            </div>
            <ArrowUpRight className="ml-auto h-5 w-5 text-green-500" />
          </CardContent>
        </Card>
        <Card className="border-gray-800 bg-gray-900/50">
          <CardContent className="flex items-center p-6">
            <div className="mr-4 rounded-full bg-purple-500/10 p-3">
              <Zap className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Volume 24h</p>
              <p className="text-2xl font-bold">$2.1B</p>
            </div>
            <ArrowUpRight className="ml-auto h-5 w-5 text-green-500" />
          </CardContent>
        </Card>
        <Card className="border-gray-800 bg-gray-900/50">
          <CardContent className="flex items-center p-6">
            <div className="mr-4 rounded-full bg-orange-500/10 p-3">
              <Zap className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Pays supportés</p>
              <p className="text-2xl font-bold">90+</p>
            </div>
            <ArrowUpRight className="ml-auto h-5 w-5 text-green-500" />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
