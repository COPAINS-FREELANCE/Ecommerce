import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const Register = async (req, res) => {
    try {
        const data = req.body;
        const newUser = await prisma.user.create({ data });
        res.json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
    }
} 