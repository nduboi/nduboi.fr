"use client"
import Image from "next/image"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section id="about" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2 mb-8 md:mb-0"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">Hi, I'm Nduboi</h1>
          <p className="text-xl mb-6 text-gray-600 dark:text-gray-400">
            I'm currently a student at Epitech, where I'm specializing in computer development.
          </p>

          <p className="text-xl mb-6 text-gray-600 dark:text-gray-400">
            Outside my studies, I have several hobbies, including swimming, scuba diving and exploring the space world.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:w-1/2 flex justify-center md:justify-center"
        >
          <Image
            src="https://nduboi.fr/build/img/nduboi_picture.JPEG"
            alt="Nduboi"
            width={400}
            height={400}
            className="rounded-full shadow-lg border-4 border-yellow-500"
          />
        </motion.div>
      </div>
    </section>
  )
}

