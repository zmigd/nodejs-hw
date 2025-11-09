import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { logger } from "./middleware/logger.js";
import notesRoutes from "./routes/notesRoutes.js";

const app = express();
app.use(helmet());
app.use(cors());
const PORT = process.env.PORT ?? 3000;
app.use(express.json());
await connectMongoDB();


app.use(logger);
app.use(notesRoutes);
app.use(notFoundHandler);
app.use(errorHandler);




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
