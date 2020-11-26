import express from 'express';
import indexRouter from './routes/index';
import db from './database/index';
import "./database";

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(indexRouter);

// db.sync({ force: true })
//     .then(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
//     .catch(() => console.log(`Server isn't running cuz: ${err}`));

(async () => {
    try {
        await db.sync();
        app.listen(PORT, () => console.log(`=> Server is running on port ${PORT}`));
    } catch (err) {
        console.log(`Server isn't running cuz: ${err}`);
    }
})();

// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
