import express from 'express';
import { startServer } from './boot/boot.js';
import { authRouter } from './routes/auth.route.js';
import cors from 'cors'

const app = express();
app.use(cors());

// Middleware setup
app.use(express.json()); // JSON FORMAT
app.use(express.urlencoded({ extended: false })); // FORMENCODED

app.use(authRouter)

startServer(app);
