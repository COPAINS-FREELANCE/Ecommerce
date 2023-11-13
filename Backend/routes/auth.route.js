import { Router } from "express";
import { Register, Login } from "../controller/auth.controller.js";

export const authRouter = Router();

authRouter.post("/signup", Register)

authRouter.post("/login", Login)
