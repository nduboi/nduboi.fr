"use client"
import { motion } from "framer-motion"
import { FaGithub, FaExternalLinkAlt, FaCode, FaLightbulb, FaMountain, FaTools } from "react-icons/fa"
import type { Project } from "../data/projectsData"
import Image from "next/image"

interface ProjectDetailsProps {
  project: Project
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

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      {/* Header */}
      <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2 sm:mb-0 sm:mr-4">
              {project.title}
            </h1>
            <div className="flex items-center">
              <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${getStatusColor(project.status)} mr-2`}></div>
              <span className={`text-sm font-medium ${getStatusTextColor(project.status)}`}>{project.status}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub className="mr-2" />
              GitHub
            </motion.a>
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600 transition-colors text-sm sm:text-base shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaExternalLinkAlt className="mr-2" />
                View Site
              </motion.a>
            )}
          </div>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">{project.longDescription}</p>
      </div>

      {/* Images with horizontal scroll */}
      <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-gray-200">
          Project Overview
        </h2>
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-4 min-w-max">
            {project.images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative w-64 sm:w-80 lg:w-96 aspect-video rounded-xl overflow-hidden shadow-md flex-shrink-0"
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${project.title} screenshot ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features, Challenges, Learnings, Improvements */}
      <div
        className={`p-4 sm:p-6 lg:p-8 grid grid-cols-1 gap-6 sm:gap-8 ${
          project.status === "To Improve" && project.improvements
            ? "md:grid-cols-2 lg:grid-cols-4"
            : "md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {/* Features */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800 dark:text-gray-200 flex items-center">
            <FaCode className="mr-2 text-yellow-500 text-base sm:text-lg" />
            Features
          </h3>
          <ul className="space-y-2">
            {project.features.map((feature, index) => (
              <li key={index} className="text-sm sm:text-base text-gray-600 dark:text-gray-400 flex items-start">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Challenges */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800 dark:text-gray-200 flex items-center">
            <FaMountain className="mr-2 text-red-500 text-base sm:text-lg" />
            Challenges
          </h3>
          <ul className="space-y-2">
            {project.challenges.map((challenge, index) => (
              <li key={index} className="text-sm sm:text-base text-gray-600 dark:text-gray-400 flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {challenge}
              </li>
            ))}
          </ul>
        </div>

        {/* Learnings */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800 dark:text-gray-200 flex items-center">
            <FaLightbulb className="mr-2 text-blue-500 text-base sm:text-lg" />
            Learnings
          </h3>
          <ul className="space-y-2">
            {project.learnings.map((learning, index) => (
              <li key={index} className="text-sm sm:text-base text-gray-600 dark:text-gray-400 flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {learning}
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements (only if status is "To Improve") */}
        {project.status === "To Improve" && project.improvements && (
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800 dark:text-gray-200 flex items-center">
              <FaTools className="mr-2 text-orange-500 text-base sm:text-lg" />
              To Improve
            </h3>
            <ul className="space-y-2">
              {project.improvements.map((improvement, index) => (
                <li key={index} className="text-sm sm:text-base text-gray-600 dark:text-gray-400 flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {improvement}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  )
}
