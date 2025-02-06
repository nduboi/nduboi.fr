"use client"
import "./globals.css"
import { Inter } from "next/font/google"
import { useState, useEffect } from "react"
import { ThemeProvider } from "next-themes"
import type { ReactNode } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <header>
        <title>Modern Nduboi</title>
        <meta name="description" content="Portfolio de Noa Roussiere, développeur web spécialisé en développement web à Epitech. Découvrez mes projets et contactez-moi."/>
        <meta name="keywords" content="Noa Roussiere, Nduboi, développeur web, portfolio, Epitech, projets web, nduboi"/>
        <meta name="theme-color" content="#000000"/>
        <meta name="msapplication-navbutton-color" content="#000000"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
        <style>
          {`
            html {
              scroll-behavior: smooth;
            }
          `}
        </style>
      </header>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

