const Header = () => {
  return (
    <header className="bg-yellow-900 shadow fixed w-full top-0 z-10">
      <div className="max-w-7xl flex items-center mx-auto py-2 px-4 sm:px-6 sm:mb-0 lg:px-8">
        <h1 className="text-lg font-bold mx-auto">
          <a href="/" className="text-yellow-500">
            MBS
          </a>
        </h1>
      </div>
    </header>
  );
};

export default Header;
