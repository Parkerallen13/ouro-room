import { useState } from "react";
import {
  TextInput,
  Textarea,
  Button,
  FileInput,
  Group,
  Title,
} from "@mantine/core";
import '../App.css'
import AdminHomeButtons from "./AdminButtons";
import Header from "./Header";


export default function DJForm() {
  const [djName, setDjName] = useState("");
  const [djBio, setDjBio] = useState("");
  const [djImage, setDjImage] = useState<File | null>(null);

  const handleSubmit = () => {
    console.log({
      dj: { name: djName, bio: djBio, image: djImage },
    });
  };

  return (
    <>
     <div className="form-header-container">
           <Header />
           <Title
             order={2}
             style={{
               zIndex: "2",
               position: "relative",
             }}
           >
             {" "}
             Add DJ
           </Title>
           <AdminHomeButtons />
         </div>
        <div
        className="form-element-container"
        style={{
          maxWidth: 600,
          margin: "0 auto",
          padding: "2rem",
          zIndex: "2",
          position: "relative",
        }}
      >
      <TextInput className="form-element"
        label="DJ Name"
        value={djName}
        onChange={(e) => setDjName(e.currentTarget.value)}
      />
      <Textarea className="form-element"
        label="DJ Bio"
        value={djBio}
        onChange={(e) => setDjBio(e.currentTarget.value)}
      />
      <FileInput className="form-element" label="DJ Image" onChange={setDjImage} />

      <Group mt="xl">
        <Button className="general-button glow-button" onClick={handleSubmit}>Submit</Button>
      </Group>
      </div>
   </>
  );
}
