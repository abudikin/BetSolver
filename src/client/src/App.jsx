import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/bets/create" element={<CreateBetPage />} />
        <Route path="/bets/:id" element={<BetDetailsPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App