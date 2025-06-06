import { MantineProvider } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import OpeningPage from "./pages/OpeningPage";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/event/Events";
import DJs from "./pages/dj/DJs";
import Gallery from "./pages/gallery/Gallery";
import Contact from "./pages/Contact";
import MixForm from './components/mix/MixForm'
import EventForm from "./components/event/EventForm";
import DJForm from "./components/dj/DJForm";
import GalleryForm from "./components/gallery/GalleryForm";
import AdminUpload from "./pages/admin/AdminUpload";
import Mixes from "./pages/mix/Mixes";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminHome from "./pages/admin/AdminHome";
import AdminChoose from "./pages/admin/AdminChoose";
import AddCarForm from "./pages/car/AddCarForm";
import CarAdmin from "./pages/car/CarAdmin";
import DisplayPage from "./pages/car/DisplayPage";
import CarList from "./components/car/CarList";
import { SelectionProvider } from "./components/SelectionProvider";
import DJSelectionPage from "./pages/dj/DJSelectionPage";
import EventSelectionPage from "./pages/event/EventSelectionPage";
import GallerySelectionPage from "./pages/gallery/GallerySelectionPage";
import MixSelectionPage from "./pages/mix/MixSelectionPage";

import "./App.css";

function App() {
  return (
      <SelectionProvider>
        <MantineProvider>
          <Router>
            <Routes>
              <Route path="/" element={<OpeningPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/djs" element={<DJs />} />
              <Route path="/mixes" element={<Mixes />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin-upload" element={<AdminUpload />} />
              <Route path="/admin-choose" element={<AdminChoose />} />
              <Route path="/mix-form" element={<MixForm />} />
              <Route path="/event-form" element={<EventForm />} />
              <Route path="/dj-form" element={<DJForm />} />
              <Route path="/gallery-form" element={<GalleryForm />} />
              <Route path="/admin-home" element={<AdminHome />} />
              <Route path="/add-car" element={<AddCarForm />} />
              <Route path="/car-admin" element={<CarAdmin />} />
              <Route path="/display" element={<DisplayPage />} />
              <Route path="/mix-select" element={<MixSelectionPage />} />
              <Route path="/dj-select" element={<DJSelectionPage />} />
              <Route path="/gallery-select" element={<GallerySelectionPage />} />
              <Route path="/event-select" element={<EventSelectionPage />} />
              <Route path="/car-list" element={<CarList />} />
            </Routes>
          </Router>
        </MantineProvider>
      </SelectionProvider>
  );
}

export default App;