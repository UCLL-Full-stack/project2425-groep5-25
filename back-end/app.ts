import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import { expressjwt } from 'express-jwt';
import helmet from 'helmet';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { projectRouter } from './controller/project.routes';
import { timeBlockRouter } from './controller/timeBlock.routes';
import { userRouter } from './controller/user.routes';
import { workDayRouter } from './controller/workDay.routes';
import { processEnv } from './env/env';

const app = express();
app.use(helmet());

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            connectSrc: ["'self'", 'https://api.ucll.be'],
        },
    }),
);

dotenv.config();
const publicApiPort = processEnv.getApiPort();
const publicFrontEndPort = processEnv.getFrontEndPort();

app.use(
    cors({
        origin: `http://localhost:${publicFrontEndPort}`,
    }),
    bodyParser.json(),
);

app.use(
    expressjwt({
        secret: processEnv.getJwtSecret(),
        algorithms: ['HS256'],
    }).unless({
        path: ['/api-docs', /^\/api-docs\/.*/, '/users/signup', '/users/login', '/status'],
    }),
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
        res.status(401).json({ status: 'Unauthorized', message: err.message });
    } else {
        res.status(400).json({ status: 'Application Error', message: err.message });
    }
});

app.listen(publicApiPort, () => {
    console.log(`Time Tracker API Running on port ${publicApiPort}.`);
    console.log(`Swagger running on http://localhost:${publicApiPort}/api-docs.`);
    console.log(
        `Check Tokens on https://jwt.io & create secrets here https://jwtsecret.com/generate.`,
    );
});
