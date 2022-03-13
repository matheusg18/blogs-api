const express = require('express');
const userRouter = require('./routes/userRouter');
const loginRouter = require('./routes/loginRouter');
const categoryRouter = require('./routes/categoryRouter');
const postRouter = require('./routes/postRouter');
const errorMiddleware = require('./middlewares/error');

const app = express();
app.use(express.json());

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/categories', categoryRouter);
app.use('/post', postRouter);

app.all('*', (_req, res) => res.status(404).json({ message: '404 NotFound :(' }));

app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));