"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaTimes, FaChevronLeft, FaChevronRight, FaSearchPlus, FaSearchMinus, FaExpand } from "react-icons/fa"
import Image from "next/image"
import { useLanguage } from "../../contexts/LanguageContext"

interface ImageModalProps {
  images: string[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  projectTitle: string
}

export default function ImageModal({ images, currentIndex, isOpen, onClose, projectTitle }: ImageModalProps) {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(currentIndex)
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
  const [optimalZoom, setOptimalZoom] = useState(1)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    setActiveIndex(currentIndex)
    setPosition({ x: 0, y: 0 })
    // Don't reset zoom here, let it be calculated on image load
  }, [currentIndex, isOpen])

  // Calculate optimal zoom based on image resolution (prioritizing height)
  const calculateOptimalZoom = (naturalWidth: number, naturalHeight: number) => {
    const containerWidth = window.innerWidth - 160 // padding + margins
    const containerHeight = window.innerHeight - 160

    // Calculate scale to fit container
    const scaleToFitX = containerWidth / naturalWidth
    const scaleToFitY = containerHeight / naturalHeight
    const scaleToFit = Math.min(scaleToFitX, scaleToFitY)

    // Define thresholds based primarily on HEIGHT
    const isVeryShort = naturalHeight < 400
    const isShort = naturalHeight < 600
    const isTall = naturalHeight > 1200
    const isVeryTall = naturalHeight > 1800

    // Also consider width for extreme aspect ratios
    const isVeryNarrow = naturalWidth < 500
    const isVeryWide = naturalWidth > 2500

    let optimalScale: number

    if (isVeryShort) {
      // Very short images: zoom significantly to make them readable
      optimalScale = Math.max(scaleToFit, 2.0) // At least 200%
    } else if (isShort) {
      // Short images: zoom moderately
      optimalScale = Math.max(scaleToFit, 1.5) // At least 150%
    } else if (isVeryTall) {
      // Very tall images: scale down more to fit height
      optimalScale = Math.min(scaleToFit, 0.4) // Max 40%
    } else if (isTall) {
      // Tall images: scale down to fit
      optimalScale = Math.min(scaleToFit, 0.7) // Max 70%
    } else {
      // Medium height images: scale to fit or keep original
      optimalScale = Math.min(scaleToFit, 1.0)
    }

    // Adjust for extreme widths
    if (isVeryNarrow && optimalScale < 1.5) {
      optimalScale = Math.max(optimalScale, 1.5) // Boost narrow images
    } else if (isVeryWide && optimalScale > 0.6) {
      optimalScale = Math.min(optimalScale, 0.6) // Reduce very wide images
    }

    // Ensure minimum and maximum bounds
    return Math.max(0.1, Math.min(optimalScale, 4))
  }

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
        case "+":
        case "=":
          zoomIn()
          break
        case "-":
          zoomOut()
          break
        case "0":
          resetZoom()
          break
      }
    }

    const handleWheel = (e: WheelEvent) => {
      if (!isOpen) return
      e.preventDefault()

      if (e.deltaY < 0) {
        zoomIn()
      } else {
        zoomOut()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.addEventListener("wheel", handleWheel, { passive: false })
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("wheel", handleWheel)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, activeIndex])

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length)
    resetZoom()
  }

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
    resetZoom()
  }

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.3, 10)) // Max 1000% zoom
  }

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.3, 0.1)) // Min 10% zoom
  }

  const resetZoom = () => {
    setZoom(optimalZoom)
    setPosition({ x: 0, y: 0 })
  }

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement
    const naturalWidth = img.naturalWidth
    const naturalHeight = img.naturalHeight

    setImageSize({ width: naturalWidth, height: naturalHeight })

    const optimal = calculateOptimalZoom(naturalWidth, naturalHeight)
    setOptimalZoom(optimal)
    setZoom(optimal)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoom > 1 && e.touches.length === 1) {
      setIsDragging(true)
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && zoom > 1 && e.touches.length === 1) {
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

  // Get image size category for display (based on height)
  const getImageSizeCategory = () => {
    if (!imageSize.width || !imageSize.height) return ""

    const { width, height } = imageSize
    const aspectRatio = width / height

    let heightCategory = ""
    if (height < 400) heightCategory = "Très basse"
    else if (height < 600) heightCategory = "Basse"
    else if (height > 1800) heightCategory = "Très haute"
    else if (height > 1200) heightCategory = "Haute"
    else heightCategory = "Moyenne"

    let aspectCategory = ""
    if (aspectRatio > 2.5) aspectCategory = " • Très large"
    else if (aspectRatio > 1.8) aspectCategory = " • Large"
    else if (aspectRatio < 0.6) aspectCategory = " • Très étroite"
    else if (aspectRatio < 0.8) aspectCategory = " • Étroite"

    return heightCategory + aspectCategory
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
              <div className="text-xs sm:text-sm opacity-75 space-y-1">
                <p>
                  {t("modal.screenshot")} {activeIndex + 1} / {images.length}
                </p>
                {imageSize.width && imageSize.height && (
                  <p className="flex items-center space-x-2">
                    <span>
                      {imageSize.width} × {imageSize.height}px
                    </span>
                    <span className="text-yellow-400">({getImageSizeCategory()})</span>
                    <span>• Zoom optimal: {Math.round(optimalZoom * 100)}%</span>
                  </p>
                )}
              </div>
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

        {/* Main Image - Centered */}
        <div
          className="relative w-full h-full flex items-center justify-center p-16 sm:p-20"
          onClick={(e) => e.stopPropagation()}
        >
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
                src={images[activeIndex] || "/placeholder.svg"}
                alt={`${projectTitle} ${t("modal.screenshot")} ${activeIndex + 1}`}
                width={1200}
                height={800}
                className="rounded-lg shadow-2xl object-contain"
                draggable={false}
                priority
                onLoad={handleImageLoad}
              />
            </motion.div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
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

        {/* Zoom Controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-1 sm:space-x-2 bg-black/50 rounded-full p-1 sm:p-2 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation()
              zoomOut()
            }}
            className="p-1.5 sm:p-2 text-white hover:bg-white/20 rounded-full transition-colors disabled:opacity-50"
            disabled={zoom <= 0.1}
            aria-label={t("modal.zoomOut")}
          >
            <FaSearchMinus size={14} className="sm:w-4 sm:h-4" />
          </button>
          <span className="text-white text-xs sm:text-sm px-2 min-w-[60px] sm:min-w-[70px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              zoomIn()
            }}
            className="p-1.5 sm:p-2 text-white hover:bg-white/20 rounded-full transition-colors disabled:opacity-50"
            disabled={zoom >= 10}
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
            title={`Retour au zoom optimal (${Math.round(optimalZoom * 100)}%)`}
          >
            <FaExpand size={14} className="sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Thumbnails - Hidden on small screens */}
        {images.length > 1 && (
          <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 hidden sm:flex space-x-2 bg-black/50 rounded-lg p-2 max-w-md overflow-x-auto z-20">
            {images.map((image, index) => (
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
                  src={image || "/placeholder.svg"}
                  alt={`${t("modal.screenshot")} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Help Text - Hidden on mobile */}
        <div className="absolute top-16 sm:top-20 right-2 sm:right-4 text-white/70 text-xs space-y-1 hidden sm:block z-20">
          <p>{t("modal.help.close")}</p>
          <p>{t("modal.help.navigate")}</p>
          <p>{t("modal.help.zoom")}</p>
          <p>{t("modal.help.pan")}</p>
          <p className="text-yellow-400">0: Zoom optimal</p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
