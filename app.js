const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const { generateClipId } = require("./utils.js")
const { connectDB } = require("./db.js")


const clipboardSchema = new mongoose.Schema({
    clipId: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    clipString: {
        type: String,
        required: true,
    },
},
{
    versionKey: false
})

const Clipboard = mongoose.model('clips', clipboardSchema)


const app = express()


app.use(express.json())
app.use(cors())


app.get("/", (req, resp) => {
    resp.sendFile(__dirname + "/index.html")
})

app.post("/save", async (req, resp) => {
    try {
        const clipboardText = req.body.clipboardText
        const clipId = generateClipId(8)

        const newClipboardItem = new Clipboard({
            clipId: clipId,
            clipString: clipboardText
        })

        const response = await newClipboardItem.save()

        resp.json({
            "clip": response
        })
    } catch (error) {
        console.error('Error saving clipboard item:', error)
        resp.status(500).json({ error: 'Internal Server Error' })
    }
})

app.get('/:clipId', async (req, res) => {
    const clipId = req.params.clipId
    try {
        const clip = await Clipboard.findOne({ clipId })

        if (!clip) {
            return res.status(404).json({ error: 'Clip not found' })
        }

        const formattedClipString = `<pre>${clip.clipString}</pre>`

        res.send(formattedClipString)
    } catch (error) {
        console.error('Error retrieving clip:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log("\n Server is running at port : 8000")
    })
})
.catch((err) => {
    console.log("MONGO DB initial connection failed !!! ", err)
})

