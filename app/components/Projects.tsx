"use client"
import { motion } from "framer-motion"
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"

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
    title: "42sh",
    description: "A shell with C for Linux",
    url: "https://github.com/nduboi/42sh",
    tech: ["C", "Shell Scripting", "Linux"],
  },
  {
    id: 3,
    title: "True or Dare",
    description: "A full true or dare game for online parties",
    url: "https://github.com/nduboi/Action-ou-verite",
    tech: ["NodeJS", "HTML", "TailwindCSS"],
  },
  {
    id: 4,
    title: "Multichat",
    description: "A project that manipulates socket and other protocols like RTMP",
    url: "https://github.com/nduboi/Multichat",
    tech: ["NodeJS", "SocketIO", "Networking", "RTMP"],
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-200 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-gray-200">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-500 hover:text-yellow-600 transition-colors flex items-center"
                  >
                    <FaGithub className="mr-2" />
                    View on GitHub
                  </a>
                  <motion.a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 transition-colors"
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
      </div>
    </section>
  )
}
