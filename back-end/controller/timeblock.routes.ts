/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Course:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Course name.
 *            description:
 *              type: string
 *              description: Course description.
 *            phase:
 *              type: number
 *              description: Course name.
 *            credits:
 *              type: number
 *              description: Course credits.
 */
import express, { NextFunction, Request, Response } from 'express';
import timeBlockService from '../service/timeBlock.service';

const timeBlockRouter = express.Router();

timeBlockRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const timeBlocks = timeBlockService.getAllTimeBlocks();
        console.log(timeBlocks);
        res.status(200).json(timeBlocks);
    } catch (error) {
        next(error);
    }
});

export { timeBlockRouter };
