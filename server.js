import express from "express";

const app = express();
const PORT = 3000;
app.use(express.json())

const users = []

app.get("/users", (req, res) => {

    res.json(users)
})

app.post("/users", (req, res) => {
    users.push(req.body)

    res.status(201).json({message: "Usuário criado com sucesso!"})
})

app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`))