import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { userSchema } from '../schema/userSchema.js';

const prisma = new PrismaClient()

export const Register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        if (!first_name || !last_name || !email) {
            return res.status(400).json({
                message: "Please fill all fields"
            })
        }

        try {
            userSchema.parse({ first_name, last_name, email, password });
        } catch (error) {
            return res.status(400).json({
                message: error.errors[0]
            });
        }

        const userExist = await prisma.user.findMany({
            where: {
                email
            }
        })

        if (userExist.length > 0) {
            return res.status(400).json({
                message: "User already exist"
            })
        }

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await prisma.user.create({
            data: {
                first_name,
                last_name,
                email,
                password: hashedPassword
            }
        });
        res.json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
    }
} 