import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.json({
    name: 'Todo REST API',
    version: '1.0.0',
    links: {
      health: '/api/health',
      todos: '/api/todos',
    },
  });
});
app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`API: http://localhost:${PORT}/api`);
});
