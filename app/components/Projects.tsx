"use client"
import { motion } from "framer-motion"

const projects = [
  { id: 1, title: "True or Dare", description: "A full true of dare for party online", url: "https://av.nduboi.fr" },
  { id: 2, title: "MyRPG", description: "A complete RPG game with CSFML for linux", url: "https://github.com/nduboi" },
  {
    id: 3,
    title: "Multichat",
    description: "A project who manipulate socket and other protocols RTMP ...",
    url: "https://github.com/nduboi",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-200 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
              <a href={project.url} className="mt-4 inline-block text-yellow-500 hover:underline">
                Learn more
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

