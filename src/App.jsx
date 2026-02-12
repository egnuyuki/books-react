import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { useAuth } from "./hooks/useAuth";
import Register from "./pages/Register";
import List from "./pages/List";
import Login from "./pages/Login";
import Layout from "./components/Layout";

// ログイン必須ページ用のプライベートルート
const PrivateRoute = ({ element, isAuthenticated, isLoading }) => {
  if (isLoading) {
    return (
      <div className="min-h-screen bg-yellow-800 flex items-center justify-center">
        <div className="text-white text-xl">読み込み中...</div>
      </div>
    );
  }

  return isAuthenticated ? element : <Navigate to="/" replace />;
};

function App() {
  const { user, isLoading } = useAuth();
  const isAuthenticated = !!user;

  return (
    <Router>
      <Layout>
        <Routes>
          {/* ログインページ - ログイン済みの場合は/listへリダイレクト */}
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/list" replace /> : <Login />
            }
          />

          {/* ログイン必須のページ */}
          <Route
            path="/list"
            element={
              <PrivateRoute
                element={<List />}
                isAuthenticated={isAuthenticated}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/register"
            element={
              <PrivateRoute
                element={<Register />}
                isAuthenticated={isAuthenticated}
                isLoading={isLoading}
              />
            }
          />

          {/* 不正なパスへのアクセス */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
