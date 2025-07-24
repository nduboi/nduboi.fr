"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa"

export default function Hero() {
  return (
    <section id="about" className="pt-32 pb-20 bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2 mb-8 md:mb-0"
        >
          <h1 className="text-5xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Hi, I'm <span className="text-yellow-500">Nduboi</span>
          </h1>
          <p className="text-xl mb-6 text-gray-600 dark:text-gray-400">
            I'm currently a student at Epitech, specializing in computer development.
          </p>
          <p className="text-xl mb-6 text-gray-600 dark:text-gray-400">
            Outside my studies, I enjoy swimming, scuba diving, and exploring the space world.
          </p>
          <div className="flex space-x-4">
            {[
              { icon: FaGithub, link: "https://github.com/nduboi" },
              { icon: FaLinkedin, link: "https://www.linkedin.com/in/noa-roussiere-0613052a1" },
              { icon: FaInstagram, link: "https://www.instagram.com/nduboiii" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:w-1/2 flex justify-center md:justify-end"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-full overflow-hidden border-4 border-yellow-500 shadow-xl"
          >
            <Image
              src="https://nduboi.fr/build/img/nduboi_picture.JPEG"
              alt="Nduboi"
              width={400}
              height={400}
              className="rounded-full transition-all duration-300 hover:brightness-110 object-cover object-center"
              style={{ objectPosition: "50% 40%" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
