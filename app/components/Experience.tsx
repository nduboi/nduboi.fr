"use client"
import { motion } from "framer-motion"
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa"
import { useLanguage } from "../contexts/LanguageContext"

const experiences = [
  {
    id: 1,
    title: "Full Stack Developer",
    company: "VMI Mixing Solutions",
    type: "Internship",
    period: "Sep 2025 - Present",
    duration: "3 mos",
    location: "Montaigu-Vendée, France",
    skills: ["React", "TypeScript", "Next.js"],
  },
  {
    id: 2,
    title: "Assistant Epitech Régional (AER)",
    company: "IONIS Education Group",
    type: "Internship",
    period: "Feb 2025 - Jul 2025",
    duration: "6 mos",
    location: "Nantes, France",
    skills: ["C", "C++", "Teaching"],
  },
  {
    id: 3,
    title: "Stagiaire",
    company: "HORANET",
    type: "Internship",
    period: "Aug 2024 - Dec 2024",
    duration: "5 mos",
    location: "Fontenay-le-Comte, France",
    skills: ["C", "Node.js", "Backend"],
  },
]

export default function Experience() {
  const { t } = useLanguage()

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-200 text-center">
            {t("experience.title")}
          </h2>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-1">{exp.title}</h3>
                    <p className="text-base text-gray-700 dark:text-gray-300">
                      {exp.company} · <span className="text-gray-600 dark:text-gray-400">{exp.type}</span>
                    </p>
                  </div>
                  <div className="flex items-center text-yellow-600 dark:text-yellow-500 font-semibold text-sm bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 rounded-full">
                    <FaBriefcase className="mr-1.5" size={14} />
                    {exp.duration}
                  </div>
                </div>

                <div className="flex flex-col gap-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-blue-500" size={14} />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-red-500" size={14} />
                    <span>{exp.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
