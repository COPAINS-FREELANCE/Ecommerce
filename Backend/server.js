import express from 'express';
import { startServer } from './boot/boot.js';
import { authRouter } from './routes/auth.route.js';


const app = express();

// Middleware setup
app.use(express.json()); // JSON FORMAT
app.use(express.urlencoded({ extended: false })); // FORMENCODED

app.use(authRouter)

startServer(app);
