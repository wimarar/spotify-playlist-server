const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let playlist = [
  { id: 1, title: "Engkau Cintanya Aku", artist: "Brisia Jodie, Arsy Widianto", playCount: 0 },
  { id: 2, title: "Monokrom", artist: "Tulus", playCount: 0 },
  { id: 3, title: "Surat Cinta Untuk Starla", artist: "Virgoun", playCount: 0 },
  { id: 4, title: "First Rabbit", artist: "JKT48", playCount: 0 },
  { id: 5, title: "Heavy Rotation", artist: "JKT48", playCount: 0 },
  { id: 6, title: "Kangen", artist: "Dewa 19", playCount: 0 },
  { id: 7, title: "My Love", artist: "Westlife", playCount: 0 },
  { id: 8, title: "Beautiful in White", artist: "Shane Filan", playCount: 0 }
  
];

app.get('/api/playlist', (req, res) => {
  res.json(playlist);
});

app.get('/api/playlist/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const song = playlist.find(item => item.id === id);
  if (!song) {
    return res.status(404).json({ message: "Song not found" });
  }
  res.json(song);
});

app.post('/api/playlist', (req, res) => {
  const { title, artist } = req.body;
  const newSong = { id: playlist.length + 1, title, artist, playCount: 0 };
  playlist.push(newSong);
  res.status(201).json(newSong);
});

app.put('/api/playlist/:id/play', (req, res) => {
  const id = parseInt(req.params.id);
  const song = playlist.find(item => item.id === id);
  if (!song) {
    return res.status(404).json({ message: "Song not found" });
  }
  song.playCount += 1;
  res.json(song);
});

app.get('/api/playlists/most-played', (req, res) => {
  const sortedSongs = playlist.slice().sort((a, b) => b.playCount - a.playCount);
  res.json(sortedSongs);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});