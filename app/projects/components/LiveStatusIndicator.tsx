"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../../contexts/LanguageContext"

interface LiveStatusIndicatorProps {
  url: string
  className?: string
}

type Status = "checking" | "online" | "offline"

export default function LiveStatusIndicator({ url, className = "" }: LiveStatusIndicatorProps) {
  const [status, setStatus] = useState<Status>("checking")
  const { language } = useLanguage()

  useEffect(() => {
    const checkStatus = async () => {
      try {
        // Utiliser une API de proxy CORS ou un endpoint personnalisé
        // Ici on utilise une approche simple avec fetch et gestion d'erreur
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout

        const response = await fetch(url, {
          method: "HEAD", // Plus rapide qu'un GET complet
          mode: "no-cors", // Évite les problèmes CORS
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        // En mode no-cors, on ne peut pas lire le status, donc on assume que c'est online si pas d'erreur
        setStatus("online")
      } catch (error) {
        // Si erreur (timeout, network error, etc.), on considère comme offline
        setStatus("offline")
      }
    }

    checkStatus()

    // Vérifier le statut toutes les 5 minutes
    const interval = setInterval(checkStatus, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [url])

  const getStatusConfig = () => {
    switch (status) {
      case "checking":
        return {
          text: language === "fr" ? "Vérification..." : "Checking...",
          color: "text-yellow-600 dark:text-yellow-400",
          bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
          borderColor: "border-yellow-300 dark:border-yellow-600",
          icon: "⏳",
        }
      case "online":
        return {
          text: language === "fr" ? "En ligne" : "Online",
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-100 dark:bg-green-900/30",
          borderColor: "border-green-300 dark:border-green-600",
          icon: "🟢",
        }
      case "offline":
        return {
          text: language === "fr" ? "Hors ligne" : "Offline",
          color: "text-red-600 dark:text-red-400",
          bgColor: "bg-red-100 dark:bg-red-900/30",
          borderColor: "border-red-300 dark:border-red-600",
          icon: "🔴",
        }
    }
  }

  const config = getStatusConfig()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${config.color} ${config.bgColor} ${config.borderColor} ${className}`}
    >
      <span className="mr-1">{config.icon}</span>
      {config.text}
      {status === "checking" && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="ml-1 w-3 h-3"
        >
          ⟳
        </motion.div>
      )}
    </motion.div>
  )
}
