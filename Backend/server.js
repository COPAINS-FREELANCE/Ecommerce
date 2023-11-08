import express from 'express';
import { startServer } from './boot/boot.js';


const app = express();

startServer(app);

