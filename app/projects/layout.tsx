import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Découvrez tous mes projets de développement : MyRPG, Arcade, 42sh, Truth or Dare, Multichat et plus encore. Projets en C, C++, JavaScript, React, Next.js.",
  openGraph: {
    title: "Mes Projets - Nduboi",
    description: "Découvrez tous mes projets de développement informatique",
    url: "https://nduboi.fr/projects",
  },
  twitter: {
    title: "Mes Projets - Nduboi",
    description: "Découvrez tous mes projets de développement informatique",
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
