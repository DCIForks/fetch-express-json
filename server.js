const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000



app.use((request, res, next) => {
  console.log(`${request.method} requested from ${request.originalUrl}`);
  next()
})


// Convert  "Content-Type": "application/json" to object in body
app.use(express.json())
app.use(express.static("public"))


app.post("/", treatJson)


app.listen(PORT, () => {
  console.log(
    `Ctrl-click to visit site at http://localhost:${PORT}`
  )
})


function treatJson(request, response) {
  // request.body will be undefined if app.use(express.json())
  // is not used
  const { body } = request
  // Log the JSON that was received in the server console
  console.log("request.body:", body);

  // Send a response to the browser
  if (body.goal) {
    response.json({ "JSON received by server": request.body });

  } else {
    response.send("JSON received. Golden Fleece not taken.")
  }
}