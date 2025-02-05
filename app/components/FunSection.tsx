"use client"
import { useState } from "react"
import { motion } from "framer-motion"

export default function FunSection() {
  const [count, setCount] = useState(0)

  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">Fun Interaction</h2>
        <motion.div
          animate={{ rotate: count * 360 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="inline-block"
        >
          <button
            onClick={() => setCount(count + 1)}
            className="bg-yellow-500 text-gray-800 text-2xl font-bold py-4 px-8 rounded-full hover:bg-yellow-600 transition duration-300"
          >
            Click me! ({count})
          </button>
        </motion.div>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
          {count === 0
            ? "Don't be shy, give it a click!"
            : count < 5
              ? "Keep going!"
              : count < 10
                ? "You're on a roll!"
                : "Wow, you're really enjoying this!"}
        </p>
      </div>
    </section>
  )
}

