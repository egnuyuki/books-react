import { BrowserRouter as Router, Routes, Route } from "react-router";
import Register from "./pages/Register";
import List from "./pages/List";
import Layout from "./components/Layout";

function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Register/>} />
          <Route path="/list" element={<List/>} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
