export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 dark:bg-gray-900 dark:text-gray-300 py-8">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} Nduboi. All rights reserved.</p>
        <p className="mt-2">Epitech Student - Promo 2028</p>
      </div>
    </footer>
  )
}

