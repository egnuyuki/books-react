import { BrowserRouter as Router, Routes, Route } from "react-router";

function App() {

  return (
    <Router>
      {/* <Layout> */}
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/register" element={<div>登録</div>} />
          <Route path="/list" element={<div>一覧</div>} />
          <Route path="/history" element={<div>購入履歴</div>} />
        </Routes>
      {/* </Layout> */}
    </Router>
  )
}

export default App
