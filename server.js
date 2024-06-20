import express from "express";
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

const PORT = 3000;
app.use(express.json())

app.get("/users", async (req, res) => {

    const users = await prisma.user.findMany()

    res.status(200).json(users)
})

app.post("/users", async (req, res) => {

    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            age: req.body.age,
            name: req.body.name
        }
    })

    res.status(201).json(user)
})

app.put("/users/:id", async (req, res) => {

    const user = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            age: req.body.age,
            name: req.body.name
        }
    })

    res.status(200).json(user)
})

app.delete("/users/:id", async (req, res) => {

    await prisma.user.delete({
        where: {
            id: req.params.id
        },
    })

    res.status(200).json({message: "Usuário deletado com sucesso!"})
})

app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`))