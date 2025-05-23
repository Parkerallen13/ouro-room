import { Container, Text } from "@mantine/core";
import Header from "../components/Header";
import "../App.css";
import LatestMixCard from "../components/LatestMix";


export default function DJs() {
  return (
    <>
      <div style={{ position: "relative", zIndex: 2 }}>
        <Header />
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* <Text className="page-intro-text">OURO DJs</Text> */}
           <Container className="page-section">
                     <Text className="page-section-header">DJs</Text>
                     <div className="latest-mix-container">
                       <LatestMixCard/>
                       <LatestMixCard/>
                       <LatestMixCard/>
                       <LatestMixCard/>
         
                     </div>
                   </Container>
        </div>
      </div>
    </>
  );
}
