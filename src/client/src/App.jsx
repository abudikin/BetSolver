import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateDispute from "./pages/CreateDispute";
import UserProfile from "./pages/UserProfile";
import DisputesList from "./pages/DisputesList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/disputes" element={<DisputesList />} />
        <Route path="/create-dispute" element={<CreateDispute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
