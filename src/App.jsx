import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import { AudioPlayer } from "./components";
import { MusicProvider } from "./context/MusicProvider";
import "./index.css";

function App() {
  return (
    <MusicProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/player/:id" element={<AudioPlayer />} />
        </Routes>
      </Router>
    </MusicProvider>
  );
}

export default App;