import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"

export const metadata: Metadata = {
  title: {
    default: "Noa ROUSSIÈRE - Portfolio",
    template: "%s | Noa ROUSSIÈRE",
  },
  description:
    "Portfolio personnel de Noa Roussière, étudiant Epitech spécialisé en développement informatique. Découvrez mes projets en C, C++, JavaScript, React, Next.js et plus encore.",
  keywords: [
    "Noa ROUSSIÈRE",
    "Noa Roussière",
    "Nduboi",
    "Epitech",
    "Développeur",
    "Portfolio",
    "C",
    "C++",
    "JavaScript",
    "React",
    "Next.js",
    "Python",
    "Linux",
  ],
  authors: [{ name: "Noa Roussière", url: "https://nduboi.fr" }],
  creator: "Noa Roussière",
  publisher: "Noa Roussière",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://nduboi.fr"),
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/",
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://nduboi.fr",
    title: "Noa ROUSSIÈRE - Portfolio",
    description: "Portfolio personnel de Noa ROUSSIÈRE, étudiant Epitech spécialisé en développement informatique.",
    siteName: "Noa ROUSSIÈRE Portfolio",
    images: [
      {
        url: "/build/img/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Noa ROUSSIÈRE Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noa ROUSSIÈRE - Portfolio",
    description: "Portfolio personnel de Noa ROUSSIÈRE, étudiant Epitech spécialisé en développement informatique.",
    creator: "@nduboi",
    images: ["/build/img/android-chrome-512x512.png"],
  },
  icons: {
    icon: [
      { url: "/build/img/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/build/img/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/build/img/favicon.ico", sizes: "any" },
    ],
    shortcut: ["/build/img/favicon.ico"],
    apple: [{ url: "/build/img/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/build/img/favicon.ico",
        color: "#eab308",
      },
    ],
  },
  manifest: "/build/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}


import './globals.css'