"use client"
import { motion } from "framer-motion"
import type { Project } from "../data/projectsData"

interface ProjectSidebarProps {
  projects: Project[]
  selectedProject: Project
  onSelectProject: (project: Project) => void
}

const getStatusColor = (status: Project["status"]) => {
  switch (status) {
    case "Finished":
      return "bg-green-500"
    case "In Progress":
      return "bg-yellow-500"
    case "To Improve":
      return "bg-orange-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusTextColor = (status: Project["status"]) => {
  switch (status) {
    case "Finished":
      return "text-green-700 dark:text-green-300"
    case "In Progress":
      return "text-yellow-700 dark:text-yellow-300"
    case "To Improve":
      return "text-orange-700 dark:text-orange-300"
    default:
      return "text-gray-700 dark:text-gray-300"
  }
}

export default function ProjectSidebar({ projects, selectedProject, onSelectProject }: ProjectSidebarProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-gray-200">Projects</h2>
      <div className="space-y-2 sm:space-y-3">
        {projects.map((project, index) => (
          <motion.button
            key={project.id}
            onClick={() => onSelectProject(project)}
            className={`w-full text-left p-3 sm:p-4 rounded-xl transition-all duration-300 ${
              selectedProject.id === project.id
                ? "bg-yellow-500 text-gray-900 shadow-md"
                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-sm"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-base sm:text-lg">{project.title}</h3>
              <div className="flex items-center">
                <div
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${getStatusColor(project.status)} mr-1 sm:mr-2`}
                ></div>
                <span
                  className={`text-xs font-medium ${selectedProject.id === project.id ? "text-gray-900" : getStatusTextColor(project.status)}`}
                >
                  {project.status}
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm opacity-80 line-clamp-2">{project.description}</p>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
