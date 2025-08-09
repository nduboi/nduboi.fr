"use client"
import { motion } from "framer-motion"
import type { Project } from "../data/tripsData"
import { useLanguage } from "../../contexts/LanguageContext"

interface ProjectSidebarProps {
  projects: Project[]
  selectedProject: Project
  onSelectProject: (project: Project) => void
}

export default function TripSidebar({ projects, selectedProject, onSelectProject }: ProjectSidebarProps) {
  const { t } = useLanguage()
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-gray-200">
        {t("projects.myTrips")}
      </h2>
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
              </div>
            </div>
            <p className="text-xs sm:text-sm opacity-80 line-clamp-2">{t(project.descriptionKey)}</p>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
