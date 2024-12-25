import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.get("/usuarios", async (req, res) => {
  const allUsers = await prisma.user.findMany();

  res.status(200).json(allUsers);
});

app.post("/usuarios", async (req, res) => {
  const userData = req.body;
  const user = await prisma.user.create({
    data: {
      ...userData,
    },
  });

  res.status(201).json(user);
});

app.put("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const newUser = req.body;

  const index = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!index) {
    res.status(404).json({ message: "Usuário não encontrado!" });
  }

  const userUpdated = await prisma.user.update({
    where: { id },
    data: { ...newUser },
  });

  //   await prisma.user.delete
  res.status(200).json(userUpdated);
});

app.delete("/usuarios/:id", async (req, res) => {
  const { id } = req.params;

  const index = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!index) {
    res.status(404).json({ message: "Usuário não encontrado!" });
  }

  await prisma.user.delete({
    where: { id },
  });

  //   await prisma.user.delete
  res.status(200).json({ message: "Usuário deletado com sucesso!" });
});

const port = 3000;
app.listen(port, () => console.log(`🚀 Servidor rodando na porta ${port}`));
