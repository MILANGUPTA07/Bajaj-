const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// POST Endpoint
app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input: 'data' should be an array" });
        }

        const numbers = data.filter(item => !isNaN(item)); // Extract numbers
        const alphabets = data.filter(item => typeof item === "string" && isNaN(item)); // Extract alphabets

        // Determine highest alphabet (case insensitive)
        const highestAlphabet = alphabets.length > 0 
            ? [alphabets.reduce((a, b) => a.toLowerCase() > b.toLowerCase() ? a : b)] 
            : [];

        res.status(200).json({
            is_success: true,
            user_id: "Milan Gupta",
            email: "guptamilan1884@gmail.com",
            roll_number: "22BCS15491",
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet
        });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ is_success: false, message: "Internal Server Error" });
    }
});

// GET Endpoint
app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
