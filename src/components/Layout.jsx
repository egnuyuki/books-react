import Header from "./Header"

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      <Header/>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-4 sm:px-0">
            {children}
          </div>
        </div>
      </main>

      <footer className="bg-white shadow mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">© 2025 My Book Studio</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout