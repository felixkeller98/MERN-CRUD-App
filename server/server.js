const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("./models/db");
const app = express();

const PORT = process.env.PORT || 5000;

// app.use wird immer dann ausgeführt, wenn die Anwendung eine Anforderung erhält.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Erlaubt es dem Frontend Requests an unseren Server mit einem anderen PORT zu senden.
// Siehe https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use(require("cors")());
// Mach die App sicherer -> https://helmetjs.github.io/
app.use(require("helmet")());
app.use("/api/students", require("./routes/students"));

// Production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  // Die Funktion verarbeitet GET-Anforderungen für jeden angegebenen Pfad
  app.get("*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
