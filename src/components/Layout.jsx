import Header from "./Header"
import { Book, FilePlusCorner } from "lucide-react"

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-yellow-800 flex flex-col justify-between">
      <Header/>

      <main>
        <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
          <div className="px-4 py-20 sm:px-0">
            {children}
          </div>
        </div>
      </main>

      <footer className="bg-yellow-900 shadow fixed bottom-0 w-full">
        <nav className="w-full py-4 px-4">
          <ul className="flex justify-around text-sm">
            <li>
              <a href="/" className="text-yellow-50 hover:text-yellow-400">
                <FilePlusCorner />
              </a>
            </li>
            <li>
              <a href="/list" className="text-yellow-50 hover:text-yellow-400">
                <Book/>
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  )
}

export default Layout