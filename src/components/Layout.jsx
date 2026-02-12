import Header from "./Header"
import { Book, FilePlusCorner } from "lucide-react"
import { useAuth } from "../hooks/useAuth"

const Layout = ({ children }) => {
  const { user } = useAuth();

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

      {user && (
        <footer className="bg-yellow-900 shadow fixed bottom-0 w-full">
          <nav className="w-full py-4 px-4">
            <ul className="flex justify-around text-sm">
              <li>
                <a href="/register" className="text-yellow-50 hover:text-yellow-400 flex flex-col items-center gap-1">
                  <FilePlusCorner />
                  <span className="text-xs">登録</span>
                </a>
              </li>
              <li>
                <a href="/list" className="text-yellow-50 hover:text-yellow-400 flex flex-col items-center gap-1">
                  <Book/>
                  <span className="text-xs">一覧</span>
                </a>
              </li>
            </ul>
          </nav>
        </footer>
      )}
    </div>
  )
}

export default Layout