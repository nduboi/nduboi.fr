"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCode,
  FaLightbulb,
  FaMountain,
  FaTools,
  FaSearchPlus,
  FaPlay,
} from "react-icons/fa"
import type { Project } from "../data/projectsData"
import Image from "next/image"
import { useLanguage } from "../../contexts/LanguageContext"
import LiveStatusIndicator from "./LiveStatusIndicator"
import MediaModal from "./MediaModal"

interface ProjectDetailsProps {
  project: Project
}

const getStatusColor = (status: Project["status"]) => {
  switch (status) {
    case "finished":
      return "bg-green-500"
    case "inProgress":
      return "bg-yellow-500"
    case "toImprove":
      return "bg-orange-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusTextColor = (status: Project["status"]) => {
  switch (status) {
    case "finished":
      return "text-green-700 dark:text-green-300"
    case "inProgress":
      return "text-yellow-700 dark:text-yellow-300"
    case "toImprove":
      return "text-orange-700 dark:text-orange-300"
    default:
      return "text-gray-700 dark:text-gray-300"
  }
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const { t } = useLanguage()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0)

  // S'assurer que le scroll n'est pas bloqué au chargement
  useEffect(() => {
    const forceScrollEnabled = () => {
      document.body.style.overflow = "auto"
      document.body.style.paddingRight = "0px"
      document.body.style.height = "auto"
    }

    // Forcer immédiatement
    forceScrollEnabled()

    // Observer pour détecter les changements de style sur le body
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const bodyStyle = document.body.style
          if (bodyStyle.overflow === 'hidden') {
            forceScrollEnabled()
          }
        }
      })
    })

    // Observer le body pour les changements de style
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style']
    })

    // Nettoyer l'observer au démontage
    return () => {
      observer.disconnect()
      forceScrollEnabled()
    }
  }, [])

  // Determine if we have improvements to show
  const hasImprovements =
    project.status === "toImprove" && project.improvementsKey && project.improvementsKey.length > 0

  // Dynamic grid classes based on whether we have improvements
  const gridClasses = hasImprovements
    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"

  const openModal = (index: number) => {
    setSelectedMediaIndex(index)
    setModalOpen(true)
  }

  return (
    <>
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
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${getStatusColor(project.status)} mr-2`}></div>
                  <span className={`text-sm font-medium ${getStatusTextColor(project.status)}`}>
                    {t(`status.${project.status}`)}
                  </span>
                </div>
                {/* Live Status Indicator for all projects with liveUrl */}
                {project.liveUrl && <LiveStatusIndicator url={project.liveUrl} />}
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
                  {t("projects.viewSite")}
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

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">{t(project.longDescriptionKey)}</p>
        </div>

        {/* Media with horizontal scroll and zoom functionality */}
        <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-gray-200">
            {t("projects.overview")}
          </h2>
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-4 min-w-max">
              {project.media.map((mediaItem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative w-64 sm:w-80 lg:w-96 aspect-video rounded-xl overflow-hidden shadow-md flex-shrink-0 group cursor-pointer"
                  onClick={() => openModal(index)}
                >
                  <Image
                    src={mediaItem.type === "video" ? mediaItem.thumbnail || mediaItem.src : mediaItem.src ? mediaItem.src : ""}
                    alt={mediaItem.alt || `${project.title} ${mediaItem.type} ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Media overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 dark:bg-gray-800/90 rounded-full p-3">
                      {mediaItem.type === "video" ? (
                        <FaPlay className="text-gray-800 dark:text-gray-200" size={20} />
                      ) : (
                        <FaSearchPlus className="text-gray-800 dark:text-gray-200" size={20} />
                      )}
                    </div>
                  </div>
                  {/* Video/GIF indicator */}
                  {mediaItem.type === "video" && (
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                      VIDEO
                    </div>
                  )}
                  {mediaItem.type === "gif" && (
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                      GIF
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Features, Challenges, Learnings, Improvements - Dynamic grid */}
        <div className={`p-4 sm:p-6 lg:p-8 ${gridClasses}`}>
          {/* Features */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800 dark:text-gray-200 flex items-center">
              <FaCode className="mr-2 text-yellow-500 text-base sm:text-lg" />
              {t("projects.features")}
            </h3>
            <ul className="space-y-2">
              {project.featuresKey?.map((featureKey, index) => (
                <li key={index} className="text-sm sm:text-base text-gray-600 dark:text-gray-400 flex items-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t(featureKey)}
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800 dark:text-gray-200 flex items-center">
              <FaMountain className="mr-2 text-red-500 text-base sm:text-lg" />
              {t("projects.challenges")}
            </h3>
            <ul className="space-y-2">
              {project.challengesKey?.map((challengeKey, index) => (
                <li key={index} className="text-sm sm:text-base text-gray-600 dark:text-gray-400 flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t(challengeKey)}
                </li>
              ))}
            </ul>
          </div>

          {/* Learnings */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800 dark:text-gray-200 flex items-center">
              <FaLightbulb className="mr-2 text-blue-500 text-base sm:text-lg" />
              {t("projects.learnings")}
            </h3>
            <ul className="space-y-2">
              {project.learningsKey?.map((learningKey, index) => (
                <li key={index} className="text-sm sm:text-base text-gray-600 dark:text-gray-400 flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t(learningKey)}
                </li>
              ))}
            </ul>
          </div>

          {/* Improvements - Only rendered if they exist */}
          {hasImprovements && (
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                <FaTools className="mr-2 text-orange-500 text-base sm:text-lg" />
                {t("projects.toImprove")}
              </h3>
              <ul className="space-y-2">
                {project.improvementsKey!.map((improvementKey, index) => (
                  <li key={index} className="text-sm sm:text-base text-gray-600 dark:text-gray-400 flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t(improvementKey)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>

      {/* Media Modal */}
      <MediaModal
        media={project.media}
        currentIndex={selectedMediaIndex}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        projectTitle={project.title}
      />
    </>
  )
}
