import { MantineProvider, type MantineThemeOverride } from "@mantine/core";
import { Routes, Route } from "react-router-dom";

// Components

// Pages
import OpeningPage from "./pages/OpeningPage";
import Home from "./pages/Home";
import Mission from "./pages/Mission";
import Events from "./pages/Events";
import DJs from "./pages/DJs";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
// import djs from "./pages/DJs";

// Styling
import "./App.css";

const theme: MantineThemeOverride = {
  fontFamily: 'Jura, sans-serif',
  headings: {
    fontFamily: 'Jura, sans-serif',
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
        <Routes>
          <Route path="/" element={<OpeningPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/events" element={<Events />} />
          <Route path="/djs" element={<DJs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/Contact" element={<Contact />} />

          {/* <Route path="/djs" element={<DJs />} /> */}
        </Routes>
    </MantineProvider>
  );
}

export default App;