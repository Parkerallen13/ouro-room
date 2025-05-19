import { MantineProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";

// Components

// Pages
import Home from "./pages/Home";
import Mission from "./pages/Mission";
import Events from "./pages/Events";
import Artists from "./pages/Artists";

// Styling
import "./App.css";

function App() {
  return (
    <MantineProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/events" element={<Events />} />
          <Route path="/artists" element={<Artists />} />
        </Routes>
    </MantineProvider>
  );
}

export default App;