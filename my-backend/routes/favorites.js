const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// MongoDB-malli
const FavoriteSchema = new mongoose.Schema({
  productId: String,
  name: String,
  userId: String,
});
const Favorite = mongoose.model("Favorite", FavoriteSchema);

// Lisää tuote suosikkeihin
router.post("/add", async (req, res) => {
  const { productId, name, userId } = req.body;
  try {
    const existing = await Favorite.findOne({ productId, userId });
    if (existing) return res.status(400).json({ message: "Tuote on jo suosikeissa" });

    const favorite = new Favorite({ productId, name, userId });
    await favorite.save();
    res.json({ message: "Tuote lisätty suosikkeihin" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Poista tuote suosikeista
router.delete("/remove", async (req, res) => {
  const { productId, userId } = req.body;
  try {
    await Favorite.findOneAndDelete({ productId, userId });
    res.json({ message: "Tuote poistettu suosikeista" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hae kaikki suosikit käyttäjälle
router.get("/:userId", async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.params.userId });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
