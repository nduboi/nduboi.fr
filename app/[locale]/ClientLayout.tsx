"use client"
import "../globals.css"
import { Inter } from "next/font/google"
import { useState, useEffect } from "react"
import { ThemeProvider } from "next-themes"
import type { ReactNode } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
  locale,
}: {
  children: ReactNode
  locale: string
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
