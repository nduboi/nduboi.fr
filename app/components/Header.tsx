"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { FaSun, FaMoon } from "react-icons/fa"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-gray-200 dark:bg-gray-800 shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <a href="#" className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Nduboi
            </a>
          </motion.div>
          <div className="hidden md:flex space-x-4">
            <a href="#about" className="text-gray-800 dark:text-gray-200 hover:text-yellow-500">
              About
            </a>
            <a href="#projects" className="text-gray-800 dark:text-gray-200 hover:text-yellow-500">
              Projects
            </a>
            <a href="#contact" className="text-gray-800 dark:text-gray-200 hover:text-yellow-500">
              Contact
            </a>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-gray-800 dark:text-gray-200 hover:text-yellow-500"
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-gray-800 dark:text-gray-200 hover:text-yellow-500 mr-4"
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 dark:text-gray-200 hover:text-yellow-500"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 space-y-2"
          >
            <a href="#about" className="block text-gray-800 dark:text-gray-200 hover:text-yellow-500">
              About
            </a>
            <a href="#projects" className="block text-gray-800 dark:text-gray-200 hover:text-yellow-500">
              Projects
            </a>
            <a href="#contact" className="block text-gray-800 dark:text-gray-200 hover:text-yellow-500">
              Contact
            </a>
          </motion.div>
        )}
      </nav>
    </header>
  )
}

