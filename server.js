const express = require("express");
const path = require("path");

const app = express();

// Serve only the static files form the dist directory
app.use(express.static("./dist/justcrok"));

app.get("*", (req, res) => {
  let pth=path.join(__dirname, "/dist/justcrok/index.html")
  console.log({pth})
  res.sendFile(pth);
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
