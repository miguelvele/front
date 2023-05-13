import express from 'express';
import message from './config/message.js';
import enviroment from './config/enviroment';
import allRoutes from "./routes/users.routes";

const app = express();

app.set("PORT", process.env.PORT || 3000);

app.use(express.json());

app.use('/api',allRoutes);

export default app;