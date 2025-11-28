import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import 'dotenv/config';
import { errors as celebrateErrors } from 'celebrate';
import { connectMongoDB } from './db/connectMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { logger } from './middleware/logger.js';
import notesRoutes from './routes/notesRoutes.js';
import cookieParser from "cookie-parser";
import authRoutes from './routes/authRoutes.js';
import { authenticate } from "./middleware/authenticate.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

// Базові middleware
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(logger);

await connectMongoDB();


app.use(authRoutes);
app.use('/notes', authenticate, notesRoutes);

app.use(celebrateErrors());
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
