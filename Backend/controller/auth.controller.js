import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { userSchema } from '../schema/userSchema.js';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient()

export const Register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        // console.log(first_name, last_name, email, password)

        if (!first_name || !last_name || !email) {
            return res.status(400).json({
                message: "Please fill all fields"
            })
        }

        //Validate req.body

        try {
            userSchema.parse({ first_name, last_name, email, password });
        } catch (error) {
            return res.status(400).json({
                message: error.errors[0]
            });
        }

        //check if user exist in the database
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


        //encrypt the password
        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)

        //save a user to the database

        const newUser = await prisma.user.create({
            data: {
                first_name,
                last_name,
                email,
                password: hashedPassword
            }
        });
        res.status(200).json({ message: "User created successfuly" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
    }
}


export const Login = async (req, res) => {

    const { email, password } = req.body

    try {
        //check if user exist in the database
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        //errror message

        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        //check if password is correct

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const payload = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            // password: user.password,
            email: user.email
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            // secure: true
        })

        res.status(200).json({
            message: "Logged in successfully",
            token,
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({ meesage: "Internal server error" })
    }
}

