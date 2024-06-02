import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import NavBar from "@/components/NavBar"
import Providers from "@/providers/Providers"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "APP TODO",
  description: "Suas tarefas organizadas!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <div className="w-full min-h-screen bg-gradient-to-b to-slate-950 from-slate-800 mx-auto flex justify-center pt-14">
          <Providers>{children}</Providers>
        </div>
        <Toaster />
      </body>
    </html>
  )
}
