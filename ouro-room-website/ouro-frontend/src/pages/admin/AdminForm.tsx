// // src/components/AdminForm.tsx
// import { useState } from "react";
// import {
//   TextInput,
//   Button,
//   Group,
//   FileInput,
//   Title,
//   Select,
// } from "@mantine/core";

// const baseUrl = import.meta.env.VITE_API_BASE_URL;

// export default function AdminForm() {
//   const [title, setTitle] = useState("");
//   const [artist, setArtist] = useState("");
//   const [audio, setAudio] = useState<File | null>(null);
//   const [type, setType] = useState<string | null>("mix");

//   const handleSubmit = async () => {
//     let audioUrl = "";

//     if (audio) {
//       const formData = new FormData();
//       formData.append("file", audio);
//       const uploadRes = await fetch("http://localhost:4000/api/upload", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await uploadRes.json();
//       audioUrl = data.url;
//     }

//     const res = await fetch(`${baseUrl}/api/elements`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         type,
//         title,
//         visible: false,
//         data: { artist, audioUrl },
//       }),
//     });

//     const json = await res.json();
//     alert("Card submitted: " + JSON.stringify(json));
//   };

//   return (
//     <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
//       <Title>Add a Card</Title>
//       <Select
//         label="Card Type"
//         value={type}
//         onChange={setType}
//         data={["mix", "event", "gallery", "dj"]}
//       />
//       <TextInput label="Title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
//       {type === "mix" && (
//         <>
//           <TextInput
//             label="Artist"
//             value={artist}
//             onChange={(e) => setArtist(e.currentTarget.value)}
//           />
//           <FileInput label="Audio File" onChange={setAudio} />
//         </>
//       )}
//       {/* Add more conditional fields for other types as needed */}
//       <Group mt="md">
//         <Button onClick={handleSubmit}>Submit</Button>
//       </Group>
//     </div>
//   );
// }