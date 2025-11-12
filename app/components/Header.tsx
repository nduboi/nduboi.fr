"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { FaSun, FaMoon, FaTimes, FaBars } from "react-icons/fa"
import { useLanguage } from "../contexts/LanguageContext"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
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

  // Close menu when clicking outside or on a link
  const closeMenu = () => setIsOpen(false)

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white dark:bg-gray-900 shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="https://nduboi.fr"
              className="text-2xl font-bold text-gray-800 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors"
            >
              Noa ROUSSIÈRE
            </a>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {["about", "projects", "trips", "contact"].map((item) => (
              <motion.a
                key={item}
                href={t(`nav.${item}-href`)}
                className="text-gray-800 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {t(`nav.${item}`)}
              </motion.a>
            ))}

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
              className="text-gray-800 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === "dark" || (theme === "system" && systemTheme === "dark") ? (
                <FaSun size={20} />
              ) : (
                <FaMoon size={20} />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors p-2 rounded-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden"
                onClick={closeMenu}
              />

              {/* Mobile Menu */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full left-4 right-4 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden md:hidden"
              >
                {/* Navigation Links */}
                <div className="p-6">
                  <div className="space-y-4">
                    {["about", "projects", "contact"].map((item, index) => (
                      <motion.a
                        key={item}
                        href={`#${item}`}
                        onClick={closeMenu}
                        className="flex items-center text-gray-800 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors text-lg font-medium py-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 8 }}
                      >
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-4"></span>
                        {t(`nav.${item}`)}
                      </motion.a>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="my-6 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>

                  {/* Controls */}
                  <div className="space-y-4">
                    {/* Language Toggle */}
                    <motion.button
                      onClick={() => {
                        setLanguage(language === "fr" ? "en" : "fr")
                        closeMenu()
                      }}
                      className="flex items-center justify-between w-full text-gray-800 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors py-3 px-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">🌐</span>
                        <div className="text-left">
                          <div className="font-medium">
                            {language === "fr" ? "Switch to English" : "Passer en Français"}
                          </div>
                          <div className="text-sm opacity-70">
                            {language === "fr" ? "Change language" : "Changer de langue"}
                          </div>
                        </div>
                      </div>
                      <div className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                        {language.toUpperCase()}
                      </div>
                    </motion.button>

                    {/* Theme Toggle */}
                    <motion.button
                      onClick={() => {
                        setTheme(theme === "dark" || (theme === "system" && systemTheme === "dark") ? "light" : "dark")
                        closeMenu()
                      }}
                      className="flex items-center justify-between w-full text-gray-800 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors py-3 px-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">
                          {theme === "dark" || (theme === "system" && systemTheme === "dark") ? "☀️" : "🌙"}
                        </span>
                        <div className="text-left">
                          <div className="font-medium">
                            {theme === "dark" || (theme === "system" && systemTheme === "dark")
                              ? t("theme.switchToLight")
                              : t("theme.switchToDark")}
                          </div>
                          <div className="text-sm opacity-70">
                            {theme === "dark" || (theme === "system" && systemTheme === "dark")
                              ? "Mode clair"
                              : "Mode sombre"}
                          </div>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                        {theme === "dark" || (theme === "system" && systemTheme === "dark") ? (
                          <FaSun size={16} className="text-gray-900" />
                        ) : (
                          <FaMoon size={16} className="text-gray-900" />
                        )}
                      </div>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
