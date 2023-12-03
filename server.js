const express = require("express");
const path = require("path");

const { dbCreator } = require("./DB/connectDB");

const app = express();
const PORT = process.env.PORT || 3000;

//create db if dont exist
dbCreator();

// health check for hoster check if server is alive and working
app.get("/healthcheck", (req, res) => res.sendStatus(200));

//    --------  MIDDLEWARE's --------

//server static files, like css images ... will be acessible in public folder

//built-in middleware for json
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "/public")));

// API Roots
app.use("/", require("./routes/root"));
app.use("/products", require("./routes/api/products"));
app.use("/users", require("./routes/api/users"));
app.use("/register", require("./routes/user/register"));

app.listen(PORT, () => {
  console.log(`Server is listen on port: ${PORT}`);
});
