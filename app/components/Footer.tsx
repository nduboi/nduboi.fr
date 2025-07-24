export default function Footer() {
  return (
    <footer className="dark:bg-gray-800 bg-gray-200 text-gray-800 dark:text-gray-300 py-8 border-t border-gray-300 dark:border-gray-600">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold dark:text-white">Nduboi</p>
            <p className="text-sm">Epitech Student - Promo 2028</p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-sm">&copy; {new Date().getFullYear()} Nduboi. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
