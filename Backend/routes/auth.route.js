import { Router } from "express";
import { Register } from "../controller/auth.controller.js";

export const authRouter = Router();

authRouter.post("/signup", Register)

