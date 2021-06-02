const express = require("express");
const app = express();
app.use(express.urlencoded({extended: false}));

const userRoute = require("./routes/userRoute");

const port = 3000;

userRoute(app);

app.get("/", (req, res) => res.send("Hello, World."));

app.listen(port, () => console.log(`API running on port ${port}.`));
