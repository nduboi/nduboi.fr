"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { FaSun, FaMoon } from "react-icons/fa"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
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
              Nduboi
            </a>
          </motion.div>
          <div className="hidden md:flex space-x-6">
            {["About", "Projects", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-800 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
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
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828z"
                  />
                ) : (
                  <path fillRule="evenodd" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 space-y-2 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            {["About", "Projects", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-gray-800 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
            <motion.button
              onClick={() =>
                setTheme(theme === "dark" || (theme === "system" && systemTheme === "dark") ? "light" : "dark")
              }
              className="block w-full text-left text-gray-800 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === "dark" || (theme === "system" && systemTheme === "dark")
                ? "Switch to Light Mode"
                : "Switch to Dark Mode"}
            </motion.button>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}
