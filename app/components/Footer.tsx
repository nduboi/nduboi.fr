import { FaHeart } from "react-icons/fa6"

export default function Footer() {
  return (
    <footer className="dark:bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold dark:text-white text-gray-800">Nduboi</p>
            <p className="text-sm dark:text-white text-gray-800">Epitech Student - Promo 2028</p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-sm dark:text-white text-gray-800">&copy; {new Date().getFullYear()} Nduboi. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

