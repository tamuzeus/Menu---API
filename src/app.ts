import express from 'express';
import dotenv from 'dotenv';
import { loginRouter, categoryRouter, productRouter, signUpRouter } from './routers';
import { connect } from './db/db';

dotenv.config();

const app = express();
app.use(express.json())
    .get('/status', (_req, res) => res.send('OK!'))
    .use('/signUp', signUpRouter)
    .use('/auth', loginRouter)
    .use('/category', categoryRouter)
    .use('/product', productRouter);

connect();

const port = process.env.MONGODB_PORT || 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));

//to drop port: sudo kill -9 `sudo lsof -t -i:4000`
