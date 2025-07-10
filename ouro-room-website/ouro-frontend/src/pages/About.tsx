import Header from "../components/Header";
import "../App.css";
import Footer from "../components/Footer";
import { Text, Container, Stack, Title, Button, Group, Box } from "@mantine/core";
import Record from "../assets/record.png";

export default function About() {
  return (
    <>
      <Header />
      <div style={{ minHeight: "100vh", position: "relative", zIndex: 2, overflowX: 'hidden' }}>
        <Container 
          size="md" 
          style={{ 
            display: "flex", 
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "8vh 2rem"
          }}
        >
          <Stack spacing="xl" align="center">
            <Title 
              order={1}
              style={{ 
                fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "white",
                marginBottom: "2rem",
                textTransform: "uppercase"
              }}
            >
              Who are we?
            </Title>
            <Text 
              style={{ 
                fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                opacity: 0.95,
                fontWeight: 300,
                marginBottom: "1.5rem"
              }}
              className="body-text-white about-hero-text"
            >
              OURO Collective is a Boulder-based event curation organization dedicated to 
              showcasing local talent through professionally recorded and produced content. 
              We serve as both a platform and partner for artist success, helping musicians 
              build their brand while connecting them with our devoted community.
            </Text>
            <Text 
              style={{ 
                fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                opacity: 0.85,
                fontWeight: 300,
              }}
              className="body-text-white about-hero-text"
            >
              We started as a backyard antidote—just a room, a system, and people who care about 
              the music—and have grown into a pop-up event crew that takes over a wide variety 
              of venues across Boulder and Denver.
            </Text>
          </Stack>
        </Container>
        <Box 
          className="stats-section"
          style={{ 
            padding: "8vh 0",
            margin: "8vh 0",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            borderBottom: "1px solid rgba(255,255,255,0.1)"
          }}
        >
          <Container size="lg">
            <div 
              style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "2rem",
              }}
            >
              <div className="stat-box">
                <Text className="stat-number">10K+</Text>
                <Text className="stat-label">Monthly Impressions</Text>
              </div>
              <div className="stat-box">
                <Text className="stat-number">50+</Text>
                <Text className="stat-label">Artists Featured</Text>
              </div>
              <div className="stat-box">
                <Text className="stat-number">100%</Text>
                <Text className="stat-label">Professional Content</Text>
              </div>
            </div>
          </Container>
        </Box>
        <Container 
          size="md" 
          style={{ 
            padding: "6vh 2rem",
            textAlign: "center"
          }}
        >
          <Text 
            style={{ 
              fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
              lineHeight: 1.8,
              fontWeight: 300,
              maxWidth: "800px",
              margin: "0 auto 4rem auto",
            }}
            className="body-text-white about-mission-text"
          >
            Every set we host is professionally filmed and photographed. The goal is simple: 
            give local talent a platform, a community, and the content that moves their careers forward.
          </Text>
          <Title 
            className="pop-title"
            order={2}
            style={{ 
              fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
              color: "white",
              fontWeight: 900,
              letterSpacing: "0.03em",
              textTransform: "uppercase"
            }}
          >
            If local talent wins, we all win.
          </Title>
        </Container>
        <Box className="info-section" style={{ padding: "8vh 0", marginTop: "8vh" }}>
          <Container size="lg">
            <div 
              style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "3rem",
                marginBottom: "6rem"
              }}
            >
              <div className="info-box">
                <Title order={2} className="info-box-title">
                  For Artists
                </Title>
                <ul className="info-list">
                  <li className="info-list-item">
                    <Text className="info-list-header">One-hour, no-rules set</Text>
                    <Text className="info-list-desc">Play exactly what you want, how you want.</Text>
                  </li>
                  <li className="info-list-item">
                    <Text className="info-list-header">Pro content delivered fast</Text>
                    <Text className="info-list-desc">Multicam video, photos, shorts, and reels.</Text>
                  </li>
                  <li className="info-list-item">
                    <Text className="info-list-header">Real reach</Text>
                    <Text className="info-list-desc">10k+ monthly impressions and a crowd that pulls up.</Text>
                  </li>
                </ul>
              </div>
              <div className="info-box" data-color="secondary">
                 <Title order={2} className="info-box-title">
                  For Venues & Sponsors
                </Title>
                <ul className="info-list">
                  <li className="info-list-item">
                    <Text className="info-list-header">501(c)(3) benefits</Text>
                    <Text className="info-list-desc">Your support is tax-deductible.</Text>
                  </li>
                  <li className="info-list-item">
                    <Text className="info-list-header">Proven foot-traffic bump</Text>
                    <Text className="info-list-desc">Our pop-ups consistently pack the room.</Text>
                  </li>
                  <li className="info-list-item">
                    <Text className="info-list-header">Visibility</Text>
                    <Text className="info-list-desc">Logo placement and direct community access.</Text>
                  </li>
                </ul>
              </div>
            </div>
            <Group justify="center" gap="2rem">
              <Button 
                className="cta-button-primary"
                size="xl"
                onClick={() => window.location.href = "/ouro-room/contact"}
              >
                Work With Us
              </Button>
              <Button 
                className="cta-button-secondary"
                size="xl"
                onClick={() => window.location.href = "/ouro-room/events"}
              >
                See Our Events
              </Button>
            </Group>
          </Container>
        </Box>
        <div className="rolling-record-container" style={{ opacity: 0.2 }}>
          <img src={Record} alt="rolling record" className="rolling-record" />
        </div>
      </div>
      <Footer />
    </>
  );
}
