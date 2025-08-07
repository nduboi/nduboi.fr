"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { FaSun, FaMoon, FaArrowLeft } from "react-icons/fa"
import Link from "next/link"
import { useLanguage } from "../../contexts/LanguageContext"

export default function TripHeader() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)

    // Detect system theme
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setSystemTheme(mediaQuery.matches ? "dark" : "light")
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light")
    }
    mediaQuery.addListener(handleThemeChange)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      mediaQuery.removeListener(handleThemeChange)
    }
  }, [])

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg" : "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/">
              <motion.button
                className="flex items-center text-gray-800 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaArrowLeft className="mr-1 sm:mr-2 text-sm sm:text-base" />
                {t("nav.back")}
              </motion.button>
            </Link>
            <div className="h-4 sm:h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="https://nduboi.fr"
                className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors"
              >
                Nduboi
              </a>
            </motion.div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Language Toggle */}
            <motion.button
              onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
              className="flex items-center space-x-1 text-gray-800 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
              <span className="text-xs">🌐</span>
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              onClick={() =>
                setTheme(theme === "dark" || (theme === "system" && systemTheme === "dark") ? "light" : "dark")
              }
              className="text-gray-800 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === "dark" || (theme === "system" && systemTheme === "dark") ? (
                <FaSun size={18} className="sm:w-5 sm:h-5" />
              ) : (
                <FaMoon size={18} className="sm:w-5 sm:h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}
