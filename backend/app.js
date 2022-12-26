require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./dbConnect");
const pgRoutes = require("./routes/pgRoutes");
const pgOwnerRoutes = require("./routes/pgOwnerRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
dbConnect();

//Middleware
app.use("/api", pgRoutes);
app.use("/api/user", pgOwnerRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
