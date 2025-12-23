const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl flex items-center mx-auto py-4 px-4 sm:px-6 sm:mb-0 lg:px-8">
        <h1 className="text-2xl font-bold">
          <a href="/" className="text-gray-700 hover:text-gray-900">
            MBS
          </a>
        </h1>
        <nav>
          <ul className="flex space-x-4 ml-6 text-sm">
            <li>
              <a href="/register" className="text-gray-600 hover:text-gray-800">
                登録
              </a>
            </li>
            <li>
              <a href="/list" className="text-gray-600 hover:text-gray-800">
                本棚
              </a>
            </li>
            <li>
              <a href="/history" className="text-gray-600 hover:text-gray-800">
                購入履歴
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
