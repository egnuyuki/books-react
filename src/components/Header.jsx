import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { signOut } from "../services/authService";
import { LogOut } from "lucide-react";

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("ログアウトエラー:", error.message);
    }
  };

  return (
    <header className="bg-yellow-900 shadow fixed w-full top-0 z-10">
      <div className="max-w-7xl flex items-center mx-auto py-2 px-4 sm:px-6 sm:mb-0 lg:px-8">
        <h1 className="text-lg font-bold">
          <a href="/list" className="text-yellow-500">
            MBS
          </a>
        </h1>
        {user && (
          <div className="ml-auto flex items-center gap-4">
            <span className="text-yellow-100 text-sm">{user.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-yellow-100 hover:text-yellow-300 transition-colors"
              title="ログアウト"
            >
              <LogOut size={20} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
