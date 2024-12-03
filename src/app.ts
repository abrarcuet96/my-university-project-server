import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();
app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

// error handler:
app.use(globalErrorHandler);
app.use(notFound);
export default app;
