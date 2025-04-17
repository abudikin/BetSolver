import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateDispute from "./pages/CreateDispute";
import UserProfile from "./pages/UserProfile";
import DisputesList from "./pages/DisputesList";
import EditProfile from "./pages/EditProfile";
import DisputeDetails from "./pages/DisputeDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/disputes" element={<DisputesList />} />
        <Route path="/dispute/:id" element={<DisputeDetails />} />
        <Route path="/create-dispute" element={<CreateDispute />} />
        <Route path="/edit" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
