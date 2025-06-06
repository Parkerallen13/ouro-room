// // components/AdminForm.tsx
// import { useState } from "react";
// import {
//   TextInput,
//   Textarea,
//   Button,
//   FileInput,
//   Group,
//   Title,
//   Divider,
// } from "@mantine/core";
// import '../App.css'


// export default function AdminForm() {
//   // States for each section
//   const [djName, setDjName] = useState("");
//   const [djBio, setDjBio] = useState("");
//   const [djImage, setDjImage] = useState<File | null>(null);

//   const [songTitle, setSongTitle] = useState("");
//   const [songArtist, setSongArtist] = useState("");

//   const [eventTitle, setEventTitle] = useState("");
//   const [eventDate, setEventDate] = useState("");
//   const [eventDescription, setEventDescription] = useState("");
//   const [eventImage, setEventImage] = useState<File | null>(null);

//   const [galleryImages, setGalleryImages] = useState<File[]>([]);

//   const handleSubmit = () => {
//     // Here you'd send data to your backend or Firebase
//     console.log({
//       dj: { name: djName, bio: djBio, image: djImage },
//       song: { title: songTitle, artist: songArtist },
//       event: { title: eventTitle, date: eventDate, desc: eventDescription, image: eventImage },
//       gallery: galleryImages,
//     });
//     alert("Submitted! (Replace with real backend logic)");
//   };

//   return (
//     <div style={{ maxWidth: 600, margin: "0 auto", padding: "2rem" }}>
//       <Title order={2}>Admin Dashboard</Title>

//       {/* DJ Info */}
//       <Divider my="md" label="Add DJ" />
//       <TextInput label="DJ Name" value={djName} onChange={(e) => setDjName(e.currentTarget.value)} />
//       <Textarea label="DJ Bio" value={djBio} onChange={(e) => setDjBio(e.currentTarget.value)} />
//       <FileInput label="DJ Image" onChange={setDjImage} />

//       {/* Song Info */}
//       <Divider my="md" label="Add Song" />
//       <TextInput label="Song Title" value={songTitle} onChange={(e) => setSongTitle(e.currentTarget.value)} />
//       <TextInput label="Artist" value={songArtist} onChange={(e) => setSongArtist(e.currentTarget.value)} />

//       {/* Event Info */}
//       <Divider my="md" label="Add Event" />
//       <TextInput label="Event Title" value={eventTitle} onChange={(e) => setEventTitle(e.currentTarget.value)} />
//       <TextInput label="Event Date" value={eventDate} onChange={(e) => setEventDate(e.currentTarget.value)} />
//       <Textarea label="Event Description" value={eventDescription} onChange={(e) => setEventDescription(e.currentTarget.value)} />
//       <FileInput label="Event Image" onChange={setEventImage} />

//       {/* Gallery Upload */}
//       <Divider my="md" label="Add to Gallery" />
//       <FileInput
//         label="Upload Gallery Images"
//         multiple
//         onChange={setGalleryImages}
//       />

//       <Group mt="xl">
//         <Button className="button" onClick={handleSubmit}>Submit All</Button>
//       </Group>
//     </div>
//   );
// }