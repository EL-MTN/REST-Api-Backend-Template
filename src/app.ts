import cors from 'cors';
import express from 'express';
import { MainRouter } from './routes';

export const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(MainRouter);
