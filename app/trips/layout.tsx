import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Voyages",
  description:
    "Découvrez tous mes voyages.",
  openGraph: {
    title: "Mes Voyages - Nduboi",
    description: "Découvrez tous mes voyages.",
    url: "https://nduboi.fr/trips",
  },
  twitter: {
    title: "Mes Voyages - Nduboi",
    description: "Découvrez tous mes voyages.",
  },
}

export default function TripsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
