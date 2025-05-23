import { MantineProvider, type MantineThemeOverride } from "@mantine/core";
import { Routes, Route } from "react-router-dom";

// Components

// Pages
import OpeningPage from "./pages/OpeningPage";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import DJs from "./pages/DJs";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import SongForm from "./components/SongForm";
import EventForm from "./components/EventForm";
import DJForm from "./components/DJForm";
import GalleryForm from "./components/GalleryForm";
import AdminHome from "./pages/AdminHome";
// import djs from "./pages/DJs";

// Styling
import "./App.css";

const theme: MantineThemeOverride = {
  headings: {
    sizes: {
      h1: { fontSize: '3rem' },
      h2: { fontSize: '2.5rem' },
      h3: { fontSize: '2rem' },
      // etc...
    },
  },
  components: {
    Button: {
      defaultProps: {
        variant: 'filled',
        size: 'md',
      },
      styles:({
        root: {
          padding: '8px 16px',
          fontSize: '1.2rem',
          backgroundColor: 'transparent',
          color: 'white',
          border: 'none',
          borderRadius: 0,
        },
      }),
    },
    Text: {
      styles: {
        root: {
          fontSize: '1rem',
          lineHeight: 1.5,
        },
      },
    },
    // Add more overrides here: Title, Container, etc.
  },
};

function App() {
  return (
    <MantineProvider theme={theme}>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet"></link>
        <Routes>
          <Route path="/" element={<OpeningPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/djs" element={<DJs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/songform" element={<SongForm />} />
          <Route path="/eventform" element={<EventForm />} />
          <Route path="/djform" element={<DJForm />} />
          <Route path="/galleryform" element={<GalleryForm />} />


          {/* <Route path="/djs" element={<DJs />} /> */}
        </Routes>
    </MantineProvider>
  );
}

export default App;