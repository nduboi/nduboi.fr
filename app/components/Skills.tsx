"use client"
import { motion } from "framer-motion"
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
  SiAnsible,
  SiTerraform,
  SiJenkins,
  SiSwift,
} from "react-icons/si"
import { useLanguage } from "../contexts/LanguageContext"

const skillCategories = [
  {
    titleKey: "contact.category.languages",
    skills: [
      { name: "C", icon: SiC, color: "text-blue-600" },
      { name: "C++", icon: SiCplusplus, color: "text-blue-700" },
      { name: "JavaScript", icon: SiJavascript, color: "text-yellow-500" },
      { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
      { name: "Python", icon: SiPython, color: "text-yellow-600" },
      { name: "Swift", icon: SiSwift, color: "text-orange-500" },
    ],
  },
  {
    titleKey: "contact.category.frameworks",
    skills: [
      { name: "React", icon: SiReact, color: "text-cyan-500" },
      { name: "Next.js", icon: SiNextdotjs, color: "text-gray-800 dark:text-white" },
      { name: "Node.js", icon: SiNodedotjs, color: "text-green-600" },
      { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-400" },
    ],
  },
  {
    titleKey: "contact.category.devops",
    skills: [
      { name: "Docker", icon: SiDocker, color: "text-blue-500" },
      { name: "Ansible", icon: SiAnsible, color: "text-red-600" },
      { name: "Terraform", icon: SiTerraform, color: "text-purple-600" },
      { name: "Jenkins", icon: SiJenkins, color: "text-red-500" },
      { name: "Git", icon: SiGit, color: "text-orange-600" },
      { name: "Linux", icon: SiLinux, color: "text-gray-800 dark:text-white" },
    ],
  },
]

export default function Skills() {
  const { t } = useLanguage()

  return (
    <section id="skills" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-200 text-center">
            {t("contact.skills")}
          </h2>

          <div className="space-y-6">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.titleKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{t(category.titleKey)}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: categoryIndex * 0.1 + index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer min-h-[100px] border border-gray-200 dark:border-gray-600"
                    >
                      <skill.icon size={36} className={`${skill.color} mb-2`} />
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200 text-center leading-tight">
                        {skill.name}
                      </span>
                    </motion.div>
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
