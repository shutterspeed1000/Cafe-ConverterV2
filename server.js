// setup express and server port
const express = require("express");
const PORT = 3001;

const app = express();

// add public folder to server webfiles
app.use(express.static("public"));

app.get("/", (req, res) => res.sendFile(__dirname + "/public/index.html"));

// start server
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));