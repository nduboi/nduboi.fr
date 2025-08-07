"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  FaMap,
  FaExternalLinkAlt,
  FaCode,
  FaLightbulb,
  FaMountain,
  FaTools,
  FaSearchPlus,
  FaPlay,
} from "react-icons/fa"

import {
  SiGooglemaps,
} from "react-icons/si"

import {
  CiCalendarDate,
} from "react-icons/ci"

import {
  IoLocationSharp,
} from "react-icons/io5"
import type { Trip } from "../data/tripsData"
import Image from "next/image"
import { useLanguage } from "../../contexts/LanguageContext"
import MediaModal from "./MediaModal"

interface TripDetailsProps {
  trip: Trip
}

export default function TripDetails({ trip }: TripDetailsProps) {
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

  const openModal = (index: number) => {
    setSelectedMediaIndex(index)
    setModalOpen(true)
  }

  return (
    <>
      <motion.div
        key={trip.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2 sm:mb-0 sm:mr-4">
                {trip.title}
              </h1>
              <div className="flex items-center space-x-3">
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              {trip.mapUrl && (
                <motion.a
                  href={trip.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base shadow-sm"
                >
                  <SiGooglemaps className="mr-2" />
                  Google Maps
                </motion.a>
              )}
            </div>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {trip.labels.map((tech, index) => (
              <span
                key={index}
                className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {t(trip.descriptionKey)}
          </p>
          
          {/* Trip Information */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {trip.location && (
              <div className="flex items-center space-x-2">
                <IoLocationSharp className="text-yellow-500 text-sm" />
                <span className="text-gray-700 dark:text-gray-300 text-sm">{trip.location}</span>
              </div>
            )}
            {(trip.dateStart || trip.dateEnd) && (
              <div className="flex items-center space-x-2">
                <CiCalendarDate className="text-yellow-500 text-md" />
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  {trip.dateStart && trip.dateEnd 
                    ? `${trip.dateStart} - ${trip.dateEnd}`
                    : trip.dateStart || trip.dateEnd
                  }
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Media with horizontal scroll and zoom functionality */}
        <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-gray-200">
            {t("trip.overview")}
          </h2>
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-4 min-w-max">
              {trip.media.map((mediaItem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative w-64 sm:w-80 lg:w-96 aspect-video rounded-xl overflow-hidden shadow-md flex-shrink-0 group cursor-pointer"
                  onClick={() => openModal(index)}
                >
                  <Image
                    src={mediaItem.type === "video" ? mediaItem.thumbnail || mediaItem.src : mediaItem.src}
                    alt={mediaItem.alt || `${trip.title} ${mediaItem.type} ${index + 1}`}
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
                  {/* Video indicator */}
                  {mediaItem.type === "video" && (
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                      VIDEO
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Media Modal */}
      <MediaModal
        media={trip.media}
        currentIndex={selectedMediaIndex}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        projectTitle={trip.title}
      />
    </>
  )
}
