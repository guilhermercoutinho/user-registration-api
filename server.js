import express from "express";
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 3000;

app.use(express.json());

const users = [];

function checkUserId(req, res, next) {
    const { id } = req.params;
    const index = users.findIndex( user => user.id === id)

    if (index < 0) {
        return res.status(404).json({ error: "User not found!"})
    }

    req.userId = id;
    req.userIndex = index;

    next()
}

app.get("/users", (req, res) => {

    res.status(200).json(users)
})

app.post("/users", (req, res) => {
    const { name, age } = req.body

    const newUser = { id: uuidv4(), name, age}

    users.push(newUser)

    res.status(201).json({ message: "User successfully registered!"})
})

app.put("/users/:id", checkUserId, (req, res) => {
    const id = req.userId;
    const index = req.userIndex;
    const { name, age } = req.body;

    const updatedUser = { id, name, age}

    users[index] = updatedUser

    res.status(200).json(updatedUser)
})

app.delete("/users/:id", checkUserId, (req,res) => {
    const index = req.userIndex

    users.splice(index, 1)

    res.status(200).json()
})

app.listen(port)
