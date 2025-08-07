"use client"
import { useState, useEffect } from "react"
import TripHeader from "./components/TripHeader"
import Footer from "../components/Footer"
import TripSidebar from "./components/TripSidebar"
import TripDetails from "./components/TripDetails"
import { tripsData } from "./data/tripsData"
import { useLanguage } from "../contexts/LanguageContext"

export default function TripsPage() {
  const [selectedTrip, setSelectedTrip] = useState(tripsData[0])
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
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <TripHeader />
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 max-w-7xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-center text-gray-800 dark:text-gray-200">
            {t("projects.myTrips")}
          </h1>
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
            <div className="lg:w-1/4">
              <TripSidebar
                projects={tripsData}
                selectedProject={selectedTrip}
                onSelectProject={setSelectedTrip}
              />
            </div>
            <div className="lg:w-3/4 w-full">
              <TripDetails trip={selectedTrip} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
