const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path"); // Import the path module
const app = express();
const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 5000;

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

app.use(express.json()) // for parsing application/json data in the request body
app.use(express.urlencoded({
    extended: true
})) // for parsing application/x-www-form-urlencoded data in the request bod

app.use(cors());



// Serve static files from the "build" directory
app.use(express.static(path.join(__dirname, "build")));

// Define your API routes
app.use('/', Routes);

// For any other route, serve the "index.html" file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server started at  http://localhost:${PORT}`)
})