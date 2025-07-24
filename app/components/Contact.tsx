"use client"
import { motion } from "framer-motion"
import { FaGithub, FaInstagram, FaXTwitter, FaYoutube, FaEnvelope } from "react-icons/fa6"
import {
  SiC,
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiLinux,
  SiGit,
  SiTailwindcss,
  SiDocker,
} from "react-icons/si"

const skills = [
  { name: "C", icon: SiC, color: "text-blue-600" },
  { name: "C++", icon: SiCplusplus, color: "text-blue-700" },
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-500" },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
  { name: "React", icon: SiReact, color: "text-cyan-500" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-gray-800 dark:text-white" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-green-600" },
  { name: "Python", icon: SiPython, color: "text-yellow-600" },
  { name: "Linux", icon: SiLinux, color: "text-gray-800 dark:text-white" },
  { name: "Git", icon: SiGit, color: "text-orange-600" },
  { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-400" },
  { name: "Docker", icon: SiDocker, color: "text-blue-500" },
]

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-gray-200">Compétences & Contact</h2>
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="md:flex">
            {/* Skills Section */}
            <div className="md:w-2/3 p-6 lg:p-8 flex flex-col">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Technologies & Outils</h3>
              <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 flex-1">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer min-h-[90px] border border-gray-200 dark:border-gray-600"
                  >
                    <skill.icon size={36} className={`${skill.color} mb-2`} />
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200 text-center leading-tight">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Section */}
            <div className="md:w-1/3 p-6 lg:p-8 bg-gray-50 dark:bg-gray-700 flex flex-col">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Restons connectés</h3>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6 p-4 bg-white dark:bg-gray-600 rounded-xl shadow-sm border border-gray-200 dark:border-gray-500"
              >
                <div className="flex items-center">
                  <FaEnvelope size={20} className="text-yellow-500 mr-3" />
                  <div>
                    <span className="text-gray-800 dark:text-gray-200 font-medium block">Email</span>
                    <a
                      href="mailto:noa.roussiere@epitech.eu"
                      className="text-gray-600 dark:text-gray-400 text-sm hover:text-yellow-500 transition-colors"
                    >
                      noa.roussiere@epitech.eu
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Social Media */}
              <div className="space-y-3 flex-1">
                {[
                  {
                    icon: FaGithub,
                    label: "GitHub",
                    url: "https://github.com/nduboi",
                    description: "Mes projets et contributions",
                  },
                  {
                    icon: FaInstagram,
                    label: "Instagram",
                    url: "https://www.instagram.com/nduboiii",
                    description: "Projets et inspirations",
                  },
                  {
                    icon: FaXTwitter,
                    label: "X (Twitter)",
                    url: "https://x.com/nduboi",
                    description: "Actualités tech",
                  },
                  {
                    icon: FaYoutube,
                    label: "YouTube",
                    url: "https://www.youtube.com/@nduboi",
                    description: "Tutoriels et projets",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start p-3 rounded-xl bg-white dark:bg-gray-600 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out group border border-gray-200 dark:border-gray-500"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}
                  >
                    <social.icon
                      size={20}
                      className="text-yellow-500 mr-3 mt-1 group-hover:scale-110 transition-transform"
                    />
                    <div>
                      <span className="text-gray-800 dark:text-gray-200 font-medium block text-sm">{social.label}</span>
                      <span className="text-gray-600 dark:text-gray-400 text-xs">{social.description}</span>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Contact Info */}
              <div className="mt-4 p-3 bg-white dark:bg-gray-600 rounded-xl border border-gray-200 dark:border-gray-500">
                <h4 className="text-base font-semibold mb-2 text-gray-800 dark:text-gray-200">💼 Collaboration</h4>
                <p className="text-gray-600 dark:text-gray-400 text-xs">
                  Intéressé par une collaboration ou un projet ? N'hésitez pas à me contacter !
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
