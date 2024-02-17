const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())


app.get("/", (req, resp) => {
    resp.sendFile(__dirname + "/index.html")
})

app.post("/save", (req, resp) => {
    const clipboardText = req.body.clipboardText
    resp.json({
        "msg": "Saved"
    })
})


app.listen(8000, () => {
    console.log("Now listening on port 8000....")
})