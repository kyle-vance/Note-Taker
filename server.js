const express = require("express"); 
const app = express();
const PORT = process.env.PORT || 3001;
const api = require("./routes/api")
const html = require("./routes/html")

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", api);
app.use("/", html)

app.listen(PORT, () =>
  console.log(`Server live at http://localhost:${PORT}.`)
);