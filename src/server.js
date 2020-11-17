import express from 'express';
import indexRouter from './routes/index';

import "./database";

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(indexRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
