"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaSearchPlus,
  FaSearchMinus,
  FaExpand,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand as FaFullscreen,
} from "react-icons/fa"
import Image from "next/image"
import { useLanguage } from "../../contexts/LanguageContext"
import type { MediaItem } from "../data/tripsData"

interface MediaModalProps {
  media: MediaItem[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  projectTitle: string
}

export default function MediaModal({ media, currentIndex, isOpen, onClose, projectTitle }: MediaModalProps) {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(currentIndex)
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

  // Video controls
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const currentMedia = media[activeIndex]
  const isVideo = currentMedia?.type === "video"
  const isYouTube = isVideo && (currentMedia.src.includes("youtube.com") || currentMedia.src.includes("youtu.be"))
  const videoRef = useRef<HTMLVideoElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    setActiveIndex(currentIndex)
    setZoom(1)
    setPosition({ x: 0, y: 0 })
    setIsPlaying(false)
  }, [currentIndex, isOpen])

  // Calculate initial zoom for small images
  useEffect(() => {
    if (!isVideo && imageRef.current && isOpen) {
      const img = imageRef.current
      const containerWidth = window.innerWidth - 128 // padding
      const containerHeight = window.innerHeight - 128 // padding

      // Get natural image dimensions
      const naturalWidth = img.naturalWidth
      const naturalHeight = img.naturalHeight

      if (naturalWidth && naturalHeight) {
        setImageSize({ width: naturalWidth, height: naturalHeight })

        // Calculate scale to fit container while maintaining aspect ratio
        const scaleX = containerWidth / naturalWidth
        const scaleY = containerHeight / naturalHeight
        const initialScale = Math.min(scaleX, scaleY, 1) // Don't scale up initially

        // For very small images, set a minimum zoom
        const minDisplaySize = 400 // minimum size for comfortable viewing
        const minScale = Math.min(minDisplaySize / naturalWidth, minDisplaySize / naturalHeight)

        const finalScale = Math.max(initialScale, minScale, 0.5)
        setZoom(finalScale)
      }
    }
  }, [activeIndex, isVideo, isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          goToPrevious()
          break
        case "ArrowRight":
          goToNext()
          break
        case " ":
          e.preventDefault()
          if (isVideo) togglePlay()
          break
        case "+":
        case "=":
          if (!isVideo) zoomIn()
          break
        case "-":
          if (!isVideo) zoomOut()
          break
        case "0":
          if (!isVideo) resetZoom()
          break
        case "m":
        case "M":
          if (isVideo) toggleMute()
          break
      }
    }

    const handleWheel = (e: WheelEvent) => {
      if (!isOpen) return
      
      // Pour les iframes YouTube, toujours empêcher le scroll
      if (isYouTube) {
        e.preventDefault()
        e.stopPropagation()
        return
      }
      
      // Pour les images, permettre le zoom
      if (isVideo) return
      e.preventDefault()

      if (e.deltaY < 0) {
        zoomIn()
      } else {
        zoomOut()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      // Toujours ajouter le gestionnaire de wheel pour empêcher le scroll
      document.addEventListener("wheel", handleWheel, { passive: false })
      document.body.style.overflow = "hidden"
      
      // Pour les iframes YouTube, empêcher aussi les événements tactiles
      if (isYouTube) {
        const handleTouchMove = (e: TouchEvent) => {
          e.preventDefault()
        }
        document.addEventListener("touchmove", handleTouchMove, { passive: false })
      }
    } else {
      // S'assurer que le scroll est débloqué quand le modal est fermé
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("wheel", handleWheel)
      if (isYouTube) {
        document.removeEventListener("touchmove", (e) => e.preventDefault())
      }
      // Toujours remettre le scroll en cleanup
      document.body.style.overflow = "unset"
    }
  }, [isOpen, activeIndex, isVideo, isYouTube])

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % media.length)
    resetZoom()
  }

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + media.length) % media.length)
    resetZoom()
  }

  const zoomIn = () => {
    if (!isVideo) setZoom((prev) => Math.min(prev * 1.3, 8)) // Increased max zoom for small images
  }

  const zoomOut = () => {
    if (!isVideo) setZoom((prev) => Math.max(prev / 1.3, 0.2)) // Allow more zoom out
  }

  const resetZoom = () => {
    if (!isVideo && imageSize.width && imageSize.height) {
      const containerWidth = window.innerWidth - 128
      const containerHeight = window.innerHeight - 128

      const scaleX = containerWidth / imageSize.width
      const scaleY = containerHeight / imageSize.height
      const initialScale = Math.min(scaleX, scaleY, 1)

      const minDisplaySize = 400
      const minScale = Math.min(minDisplaySize / imageSize.width, minDisplaySize / imageSize.height)

      const finalScale = Math.max(initialScale, minScale, 0.5)
      setZoom(finalScale)
    } else {
      setZoom(1)
    }
    setPosition({ x: 0, y: 0 })
  }

  // Video controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
      setIsLoading(false)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const newTime = (clickX / rect.width) * duration
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // Mouse/Touch handlers for images
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1 && !isVideo) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1 && !isVideo) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoom > 1 && e.touches.length === 1 && !isVideo) {
      setIsDragging(true)
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && zoom > 1 && e.touches.length === 1 && !isVideo) {
      e.preventDefault()
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      })
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }
    function extractYoutubeId(url: string): string | null {
      const match = url.match(
        /(?:youtube\.com.*(?:\/|v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      )
      return match ? match[1] : null
    }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
        onClick={onClose}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-3 sm:p-4">
          <div className="flex justify-between items-center text-white">
            <div>
              <h3 className="text-base sm:text-lg font-semibold">{projectTitle}</h3>
              <p className="text-xs sm:text-sm opacity-75">
                {isVideo ? t("modal.video") : t("modal.screenshot")} {activeIndex + 1} / {media.length}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label={t("modal.close")}
            >
              <FaTimes size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Main Content - Centered */}
        <div
          className="relative w-full h-full flex items-center justify-center p-16 sm:p-20"
          onClick={(e) => e.stopPropagation()}
        >
          {isVideo ? (
          isYouTube ? (
            <div 
              className="relative w-full h-full max-w-4xl max-h-[80vh] flex items-center justify-center"
              style={{ pointerEvents: 'auto' }}
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${extractYoutubeId(currentMedia.src)}?autoplay=1&rel=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg shadow-2xl"
                scrolling="no"
                style={{ 
                  border: 'none',
                  pointerEvents: 'auto'
                }}
              ></iframe>
              {/* Couche invisible pour gérer les clics mais pas le scroll */}
              <div 
                className="absolute inset-0"
                onMouseDown={(e) => {
                  // Permettre aux clics de passer à travers
                  e.currentTarget.style.pointerEvents = 'none'
                  setTimeout(() => {
                    e.currentTarget.style.pointerEvents = 'auto'
                  }, 0)
                }}
                onClick={(e) => {
                  // Permettre aux clics de passer à travers
                  e.currentTarget.style.pointerEvents = 'none'
                  setTimeout(() => {
                    e.currentTarget.style.pointerEvents = 'auto'
                  }, 0)
                }}
                style={{ 
                  pointerEvents: 'auto',
                  background: 'transparent',
                  zIndex: 1
                }}
              />
            </div>
          ) : (
            <div className="relative w-full h-full max-w-4xl max-h-[80vh] flex items-center justify-center">
              <video
                ref={videoRef}
                src={currentMedia.src}
                className="w-full h-full max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                controls={false}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onVolumeChange={(e) => {
                  const target = e.target as HTMLVideoElement;
                  setVolume(target.volume);
                  setIsMuted(target.muted);
                }}
              >
                {t("modal.videoNotSupported")}
              </video>

              {/* Video Controls Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 rounded-lg p-3 space-y-3">
                {/* Progress Bar */}
                <div className="flex items-center space-x-2 text-white text-xs">
                  <span className="min-w-[35px]">{formatTime(currentTime)}</span>
                  <div
                    className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer relative group"
                    onClick={handleProgressClick}
                  >
                    <div
                      className="h-full bg-yellow-500 rounded-full transition-all duration-150"
                      style={{ width: duration ? `${(currentTime / duration) * 100}%` : "0%" }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        left: duration ? `${(currentTime / duration) * 100}%` : "0%",
                        transform: "translateX(-50%) translateY(-50%)",
                      }}
                    />
                  </div>
                  <span className="min-w-[35px]">{isLoading ? "--:--" : formatTime(duration)}</span>
                </div>

                {/* Controls */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={togglePlay}
                    className="text-white hover:text-yellow-500 transition-colors"
                    aria-label={isPlaying ? t("modal.pause") : t("modal.play")}
                  >
                    {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-yellow-500 transition-colors"
                    aria-label={isMuted ? t("modal.unmute") : t("modal.mute")}
                  >
                    {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />

                  <div className="flex-1"></div>

                  <button
                    onClick={toggleFullscreen}
                    className="text-white hover:text-yellow-500 transition-colors"
                    aria-label={t("modal.fullscreen")}
                  >
                    <FaFullscreen size={16} />
                  </button>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="relative flex items-center justify-center w-full h-full">
            <motion.div
              className="relative cursor-move select-none flex items-center justify-center"
              style={{
                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                ref={imageRef}
                src={currentMedia.src || "/placeholder.svg"}
                alt={currentMedia.alt || `${projectTitle} ${t("modal.screenshot")} ${activeIndex + 1}`}
                width={1200}
                height={800}
                className="rounded-lg shadow-2xl object-contain"
                draggable={false}
                priority
                onLoad={(e) => {
                  const img = e.target as HTMLImageElement;
                  setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
                }}
              />
            </motion.div>
          </div>
        )}
        </div>

        {/* Navigation Arrows */}
        {media.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors z-20"
              aria-label={t("modal.navigate")}
            >
              <FaChevronLeft size={16} className="sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors z-20"
              aria-label={t("modal.navigate")}
            >
              <FaChevronRight size={16} className="sm:w-5 sm:h-5" />
            </button>
          </>
        )}

        {/* Zoom Controls - Only for images */}
        {!isVideo && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-1 sm:space-x-2 bg-black/50 rounded-full p-1 sm:p-2 z-20">
            <button
              onClick={(e) => {
                e.stopPropagation()
                zoomOut()
              }}
              className="p-1.5 sm:p-2 text-white hover:bg-white/20 rounded-full transition-colors disabled:opacity-50"
              disabled={zoom <= 0.2}
              aria-label={t("modal.zoomOut")}
            >
              <FaSearchMinus size={14} className="sm:w-4 sm:h-4" />
            </button>
            <span className="text-white text-xs sm:text-sm px-2 min-w-[50px] sm:min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                zoomIn()
              }}
              className="p-1.5 sm:p-2 text-white hover:bg-white/20 rounded-full transition-colors disabled:opacity-50"
              disabled={zoom >= 8}
              aria-label={t("modal.zoomIn")}
            >
              <FaSearchPlus size={14} className="sm:w-4 sm:h-4" />
            </button>
            <div className="w-px h-4 sm:h-6 bg-white/30 mx-1"></div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                resetZoom()
              }}
              className="p-1.5 sm:p-2 text-white hover:bg-white/20 rounded-full transition-colors"
              aria-label={t("modal.reset")}
            >
              <FaExpand size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>
        )}

        {/* Thumbnails */}
        {media.length > 1 && (
          <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 hidden sm:flex space-x-2 bg-black/50 rounded-lg p-2 max-w-md overflow-x-auto z-20">
            {media.map((mediaItem, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveIndex(index)
                  resetZoom()
                }}
                className={`relative w-10 h-6 sm:w-12 sm:h-8 rounded overflow-hidden flex-shrink-0 ${
                  index === activeIndex ? "ring-2 ring-yellow-500" : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={mediaItem.type === "video" ? mediaItem.thumbnail || mediaItem.src : mediaItem.src}
                  alt={mediaItem.alt || `${mediaItem.type} ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {mediaItem.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FaPlay className="text-white text-xs opacity-80" />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Help Text */}
        <div className="absolute top-16 sm:top-20 right-2 sm:right-4 text-white/70 text-xs space-y-1 hidden sm:block z-20">
          <p>{t("modal.help.close")}</p>
          <p>{t("modal.help.navigate")}</p>
          {isVideo ? (
            <>
              <p>{t("modal.help.playPause")}</p>
              <p>{t("modal.help.mute")}</p>
            </>
          ) : (
            <>
              <p>{t("modal.help.zoom")}</p>
              <p>{t("modal.help.pan")}</p>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
