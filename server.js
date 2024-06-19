import express from "express";

const app = express();
const PORT = 3000;
app.use(express.json())

app.get("/users", (req, res) => {

    res.send("Olá")
})

app.post("/users", (req, res) => {

    res.json()
})

app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`))