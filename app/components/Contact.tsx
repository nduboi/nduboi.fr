"use client"
import { FaGithub, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6"

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">Get in Touch</h2>
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">GitHub Activity</h3>
          <img
            src="https://ghchart.rshah.org/nduboi"
            alt="Nduboi's GitHub Contribution Chart"
            className="w-full h-auto"
          />
        </div>
        <div className="mt-8 flex justify-center space-x-6">
          <a href="https://github.com/nduboi" className="text-gray-600 dark:text-gray-400 hover:text-yellow-500">
            <FaGithub size={30} />
          </a>
          <a
            href="https://www.instagram.com/nduboiii"
            className="text-gray-600 dark:text-gray-400 hover:text-yellow-500"
          >
            <FaInstagram size={30} />
          </a>
          <a href="https://x.com/nduboi" className="text-gray-600 dark:text-gray-400 hover:text-yellow-500">
            <FaXTwitter size={30} />
          </a>
          <a href="https://www.youtube.com/@nduboi" className="text-gray-600 dark:text-gray-400 hover:text-yellow-500">
            <FaYoutube size={30} />
          </a>
        </div>
      </div>
    </section>
  )
}

