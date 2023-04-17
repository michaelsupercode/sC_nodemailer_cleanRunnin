const express = require("express")
const cors = require("cors")
const { nanoid } = require("nanoid")

const { sendEmail } = require("./sendEmail");

const PORT = 9000
const app = express()

const usersArray = [
    {
        id: nanoid(),
        name: "",
        email: ""
    }
]

app.use(cors())
app.use(express.json())

app.get("/", (_, res) => res.send("it fuckin`works :)"));

app.get("/users", (req, res) => {
    res.json(usersArray)
})

const welcomeMessage = (name) => `
Hallo ${name}!
`

app.post("/users/registerUser", (req, res) => {
    const name = req.body.name
    const email = req.body.email

    const newUser = {
        id: nanoid(),
        name,
        email
    }

    const foundUser = usersArray.find(u => u.email === email)
    if(foundUser) {
        res.status(400).json({ error: "User already exists."})
        return
    }

    sendEmail({
        to: email,
        subject: "",
        message: welcomeMessage(name)
    }).then(() => {
        usersArray.push(newUser)
        res.json(usersArray)
    }).catch((err) => {
        res.status(400).json({ error: "User wasn NOT registered, please try again, please use valid email."})
    })
})

app.listen(PORT, () => console.log("Server listening on port", PORT))