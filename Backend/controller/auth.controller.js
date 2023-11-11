import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const Register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        if (!first_name || !last_name || !email) {
            return res.status(400).json({
                message: "Please fill all fields"
            })
        }

        const userExist = await prisma.user.findMany({
            where: {
                email
            }
        })

        if (userExist) {
            return res.status(400).json({
                message: "User already exist"
            })
        }



        const newUser = await prisma.user.create({ data });
        res.json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
    }
} 