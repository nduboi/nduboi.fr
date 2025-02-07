"use client"
import { motion } from "framer-motion"
import { FaDiscord } from "react-icons/fa"
import { FaGithub, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6"

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-gray-200">Connect With Me</h2>
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">GitHub Activity</h3>
              <img
                src="https://ghchart.rshah.org/nduboi"
                alt="Nduboi's GitHub Contribution Chart"
                className="w-full h-auto"
              />
            </div>
            <div className="md:w-1/2 p-6 bg-gray-50 dark:bg-gray-700">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Social Media</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: FaGithub, label: "GitHub", url: "https://github.com/nduboi" },
                  { icon: FaInstagram, label: "Instagram", url: "https://www.instagram.com/nduboiii" },
                  { icon: FaXTwitter, label: "X (Twitter)", url: "https://x.com/nduboi" },
                  { icon: FaDiscord, label: "Discord", url: "https://discord.gg/Rn7eMCd" },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 rounded-lg bg-white dark:bg-gray-600 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <social.icon size={24} className="text-yellow-500 mr-2" />
                    <span className="text-gray-800 dark:text-gray-200">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}