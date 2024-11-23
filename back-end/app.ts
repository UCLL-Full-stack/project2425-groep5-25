import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NotFoundError } from './errors';
import { projectRouter } from './controller/project.routes';
import { userRouter } from './controller/user.routes';
import { workDayRouter } from './controller/workDay.routes';
import { timeBlockRouter } from './controller/timeBlock.routes';
import { expressjwt } from 'express-jwt';

const app = express();

dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(bodyParser.json());

app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256'],
    }).unless({
        path: ['/api-docs', /^\/api-docs\/.*/, '/users/signup', '/users/login', '/status'],
    })
);

app.use('/projects', projectRouter);
app.use('/users', userRouter);
app.use('/workdays', workDayRouter);
app.use('/timeblocks', timeBlockRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Time Tracker API Running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Time Tracker API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: err.message });
    } else if (err instanceof NotFoundError) {
        res.status(404).json({ status: 'not found', message: err.message });
    } else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});

app.listen(port || 3000, () => {
    console.log(`Time Tracker API Running on port ${port}.`);
    console.log(`Swagger running on http://localhost:${port}/api-docs.`);
    console.log(`Check Tokens on https://jwt.io.`);
});