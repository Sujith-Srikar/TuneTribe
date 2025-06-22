import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import { AudioPlayer } from "./components";
import { MusicProvider } from "./context/MusicProvider";
import "./index.css";
import { Toaster } from "react-hot-toast";
import SearchPage from "./pages/SearchPage"


function App() {
  return (
    <>
      <Toaster />
      <MusicProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/player/:id" element={<AudioPlayer />} />
            <Route path="/search/:id" element={<SearchPage />} />

          </Routes>
        </Router>
      </MusicProvider>
    </>
  );
}

export default App;