import express from "express";
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 3000;

app.use(express.json());

const users = [];

app.get("/users", (req, res) => {

    res.status(200).json(users)
})

app.post("/users", (req, res) => {
    const { name, age } = req.body

    const newUser = { id: uuidv4(), name, age}

    users.push(newUser)

    res.status(201).json({ message: "User successfully registered!"})
})

app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;

    const index = users.findIndex( user => user.id === id)

    if (index < 0) {
        res.status(404).json({ error: "User not found!"})
    }

    const updatedUser = { id, name, age}

    users.splice(index,1, updatedUser)

    res.status(200).json()
})

app.listen(port)
