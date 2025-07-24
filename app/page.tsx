import Header from "./components/Header"
import Hero from "./components/Hero"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 overflow-x-hidden">
      <Header />
      <Hero />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
