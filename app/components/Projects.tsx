"use client"
import { motion } from "framer-motion"
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from "react-icons/fa"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const projects = [
  {
    id: 1,
    title: "MyRPG",
    description: "A complete RPG game with CSFML for Linux",
    url: "https://github.com/nduboi/MyRPG",
    tech: ["C", "CSFML", "Linux"],
  },
  {
    id: 2,
    title: "Arcade",
    description: "An application where you can change display-lib and game on run-time",
    url: "https://github.com/nduboi/Arcade",
    tech: [
      "C++",
      "Dynamic library",
      "CMAKE",
      "SFML",
      "Ncurses",
      "Allegro",
      "SDL2",
      "QT5",
      "Minesweeper",
      "Snake",
      "Pacman",
      "Nibbler",
      "Linux",
    ],
  },
  {
    id: 3,
    title: "42sh",
    description: "A shell with C for Linux",
    url: "https://github.com/nduboi/42sh",
    tech: ["C", "Shell Scripting", "Linux"],
  },
  {
    id: 4,
    title: "Truth or Dare",
    description: "A full true or dare game for online parties",
    url: "https://github.com/nduboi/Truth-or-Dare",
    tech: ["NodeJS", "HTML", "TailwindCSS", "SQL", "SocketIO", "Next.js", "API", "React", "TypeScript", "Docker"],
  },
  {
    id: 5,
    title: "Multichat",
    description: "A project that manipulates socket and other protocols like RTMP",
    url: "https://github.com/nduboi/Multichat",
    tech: ["NodeJS", "SocketIO", "Networking", "RTMP"],
  },
  {
    id: 6,
    title: "Nduboi.fr",
    description: "A personal portfolio, using modern techno.",
    url: "https://github.com/nduboi/nduboi.fr",
    tech: ["React", "TypeScript", "TailwindCSS", "NextJS"],
  },
]

function TechScrollContainer({ tech }: { tech: string[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hasOverflow, setHasOverflow] = useState(false)

  useEffect(() => {
    const checkOverflow = () => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth } = scrollRef.current
        setHasOverflow(scrollWidth > clientWidth)
      }
    }

    checkOverflow()
    window.addEventListener("resize", checkOverflow)
    return () => window.removeEventListener("resize", checkOverflow)
  }, [tech])

  return (
    <div className={`scroll-fade ${hasOverflow ? "has-overflow" : ""}`}>
      <div ref={scrollRef} className="overflow-x-auto custom-scrollbar pb-4" style={{ scrollbarGutter: "stable" }}>
        <div className="flex gap-2 min-w-max pr-5">
          {tech.map((techItem, index) => (
            <span
              key={index}
              className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-xl text-sm whitespace-nowrap flex-shrink-0"
            >
              {techItem}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-200 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-gray-200">Mes Projets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-600 flex flex-col hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{project.description}</p>

                {/* Technologies avec scroll horizontal personnalisé */}
                <div className="mb-6">
                  <TechScrollContainer tech={project.tech} />
                </div>

                {/* Liens en bas de la carte */}
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200 dark:border-gray-600">
                  <motion.a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-500 hover:text-yellow-600 transition-colors flex items-center font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub className="mr-2" />
                    GitHub
                  </motion.a>
                  <motion.a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaExternalLinkAlt />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action pour voir tous les projets */}
        <div className="text-center">
          <Link href="/projects">
            <motion.button
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 flex items-center mx-auto shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See all my projects
              <FaArrowRight className="ml-2" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  )
}
