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
        <title>Nduboi</title>
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
        <link rel="icon" type="image/png" sizes="32x32" href="build/img/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="build/img/favicon-16x16.png"/>
        <link rel="apple-touch-icon" sizes="180x180" href="build/img/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="192x192" href="build/img/android-chrome-192x192.png"/>
        <link rel="icon" type="image/png" sizes="512x512" href="build/img/android-chrome-512x512.png"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
        <link rel="manifest" href="build/img/site.webmanifest"/>
        <script type="application/ld+json">
        {`
          {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Noa Roussiere",
              "alternateName": "Nduboi",
              "url": "https://nduboi.fr",
              "jobTitle": "Développeur",
              "alumniOf": "Epitech",
              "sameAs": [
                  "https://github.com/nduboi",
                  "https://www.instagram.com/nduboiii",
                  "https://x.com/Nduboi_twitch",
                  "https://www.linkedin.com/in/noa-roussiere-0613052a1"
              ]
          }
          `
        }
        </script>
      </header>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

