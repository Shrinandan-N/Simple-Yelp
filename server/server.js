require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();

// express middleware that stores req in req body
app.use(cors());
app.use(express.json());

// Get all Restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM restaurants");
    res.status(200).json({
      status: "success",
      results: rows.length,
      data: {
        restaurants: rows,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      error: err,
    });
  }
});

// Get a Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM restaurants WHERE id = $1", [
      req.params.id,
    ]);
    res.status(200).json({
      status: "success",
      results: rows.length,
      data: {
        restaurant: rows[0],
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      error: err,
    });
  }
});

// Create a Restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const { rows } = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(200).json({
      status: "success",
      results: rows.length,
      data: {
        restaurant: rows,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      error: err,
    });
  }
});

// Update Restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const { rows } = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(200).json({
      status: "success",
      results: rows.length,
      data: {
        restaurant: rows,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      error: err,
    });
  }
});

// Delete Restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const { rows } = await db.query(
      "DELETE FROM restaurants WHERE id = $1 returning *",
      [req.params.id]
    );
    res.status(200).json({
      status: "success",
      results: rows.length,
      data: {
        restaurant: rows,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      error: err,
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
