"use client"
import { useState, useEffect } from "react"
import ProjectHeader from "./components/ProjectHeader"
import Footer from "../components/Footer"
import ProjectSidebar from "./components/ProjectSidebar"
import ProjectDetails from "./components/ProjectDetails"
import { projectsData } from "./data/projectsData"
import { useLanguage } from "../contexts/LanguageContext"

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(projectsData[0])
  const { t } = useLanguage()

  // S'assurer que le scroll fonctionne
  useEffect(() => {
    const forceScrollEnabled = () => {
      document.body.style.overflow = "auto"
      document.body.style.paddingRight = "0px"
      document.body.style.height = "auto"
    }

    // Forcer immédiatement
    forceScrollEnabled()

    // Vérifier périodiquement et corriger si nécessaire
    const interval = setInterval(() => {
      if (document.body.style.overflow === 'hidden') {
        forceScrollEnabled()
      }
    }, 100)

    return () => {
      clearInterval(interval)
      forceScrollEnabled()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <ProjectHeader />
      <main className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-center text-gray-800 dark:text-gray-200">
            {t("projects.myProjects")}
          </h1>
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
            <div className="lg:w-1/4">
              <ProjectSidebar
                projects={projectsData}
                selectedProject={selectedProject}
                onSelectProject={setSelectedProject}
              />
            </div>
            <div className="lg:w-3/4">
              <ProjectDetails project={selectedProject} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
