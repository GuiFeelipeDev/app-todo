import HomeView from "@/components/views/HomeView"
import { authOptions } from "@/lib/auth"

import { getServerSession } from "next-auth"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main className="w-full flex justify-center">
      <HomeView />
    </main>
  )
}
