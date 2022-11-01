import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { app } from './app';
import { logger } from './util/logger';

mongoose.connect(process.env.MONGO_URI, () => {
	logger.info('Connected to mongodb');
});

app.listen(1025, () => {
	logger.info(`App running on port ${process.env.PORT}`);
});
