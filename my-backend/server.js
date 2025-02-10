const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

require('dotenv').config();  // Lataa ympäristömuuttujat .env-tiedostosta

const app = express();
app.use(express.json());
app.use(cors());

// Debug-tulostus ympäristömuuttujalle
console.log("Yhdistettävä MongoDB URI:", process.env.MONGO_URI);  // Tarkista, että URI on oikein

// MongoDB Atlas yhteyden muodostus
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Atlas yhdistetty"))
  .catch(err => console.error("Virhe MongoDB yhteydessä:", err));

app.get("/", (req, res) => {
  res.send("Tervetuloa backendiin!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server pyörii portissa ${PORT}`);
});
