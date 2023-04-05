import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json())
    .get('/health', (_req, res) => res.send('OK!'))

const port = process.env.MONGODB_PORT || 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));

//to drop port: sudo kill -9 `sudo lsof -t -i:4000`
