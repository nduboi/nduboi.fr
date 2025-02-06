"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { FaSun, FaMoon } from "react-icons/fa"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
            <a href="#about" className="text-gray-800 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-500">
              About
            </a>
            <a href="#projects" className="text-gray-800 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-500">
              Projects
            </a>
            <a href="#contact" className="text-gray-800 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-500">
              Contact
            </a>
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="text-gray-800 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-500"
              >
                {resolvedTheme === "dark" ? <FaSun /> : <FaMoon />}
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
