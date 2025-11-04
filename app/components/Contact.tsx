"use client"
import { motion } from "framer-motion"
import { FaGithub, FaInstagram, FaYoutube, FaEnvelope, FaDownload, FaLinkedin } from "react-icons/fa6"
import { useLanguage } from "../contexts/LanguageContext"

export default function Contact() {
  const { t } = useLanguage()
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4 text-gray-800 dark:text-gray-200">{t("contact.stayConnected")}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">{t("contact.collaborationText")}</p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* CV Download Card */}
            <motion.a
              href="/cv.pdf"
              download={`NOA_ROUSSIÈRE_STAGE_EPITECH_CV_${new Date().getFullYear()}.pdf`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-gradient-to-br from-yellow-400 to-yellow-600 dark:from-yellow-500 dark:to-yellow-700 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center justify-center text-white group"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="bg-white/20 p-4 rounded-full mb-4"
              >
                <FaDownload size={32} />
              </motion.div>
              <span className="text-2xl font-bold mb-2">{t("contact.downloadCV")}</span>
              <span className="text-sm opacity-90">PDF Format</span>
            </motion.a>

            {/* Email Card */}
            <motion.a
              href="mailto:noa.roussiere@epitech.eu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center justify-center border-2 border-gray-200 dark:border-gray-700 group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-full mb-4"
              >
                <FaEnvelope size={32} className="text-yellow-600 dark:text-yellow-500" />
              </motion.div>
              <span className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{t("contact.email")}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">noa.roussiere@epitech.eu</span>
            </motion.a>
          </div>

          {/* Social Media Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: FaGithub,
                label: "GitHub",
                url: "https://github.com/nduboi",
                color: "from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800",
                iconColor: "text-white",
              },
              {
                icon: FaLinkedin,
                label: "LinkedIn",
                url: "https://www.linkedin.com/in/noa-roussiere/",
                color: "from-blue-500 to-blue-700",
                iconColor: "text-white",
              },
              {
                icon: FaInstagram,
                label: "Instagram",
                url: "https://www.instagram.com/noa.roussiere/",
                color: "from-pink-500 via-purple-500 to-orange-500",
                iconColor: "text-white",
              },
              {
                icon: FaYoutube,
                label: "YouTube",
                url: "https://www.youtube.com/@nduboi",
                color: "from-red-500 to-red-700",
                iconColor: "text-white",
              },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`bg-gradient-to-br ${social.color} rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center justify-center group`}
              >
                <motion.div whileHover={{ scale: 1.2, rotate: 5 }} transition={{ duration: 0.3 }}>
                  <social.icon size={40} className={social.iconColor} />
                </motion.div>
                <span className="text-white font-semibold mt-3 text-sm">{social.label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
