/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     TimeBlock:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier of the time block
 *         startTime:
 *           type: string
 *           format: date-time
 *           description: The start time of the time block
 *         endTime:
 *           type: string
 *           format: date-time
 *           description: The end time of the time block
 *         project:
 *           $ref: '#/components/schemas/Project'
 *         workDay:
 *           $ref: '#/components/schemas/WorkDay'
 *   responses:
 *     UnauthorizedError:
 *       description: Unauthorized access due to missing or invalid token.
 *     NotFoundError:
 *       description: The requested resource was not found.
 *     ValidationError:
 *       description: Invalid input or data format.
 */
import express, { NextFunction, Request, Response } from 'express';
import { timeBlockService } from '../service/timeBlock.service';
import { JwtToken } from '../types';

const timeBlockRouter = express.Router();

/**
 * @swagger
 * /timeblocks:
 *   get:
 *     summary: Retrieve a list of time blocks
 *     description: Fetch all time blocks from the database, including project and work day details.
 *     tags:
 *       - TimeBlocks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of time blocks with project and work day information.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TimeBlock'
 */
timeBlockRouter.get(
    '/',
    async (req: Request & { auth: JwtToken }, res: Response, next: NextFunction) => {
        try {
            const timeBlocks = await timeBlockService.getAllTimeBlocks();
            res.status(200).json(timeBlocks);
        } catch (error) {
            next(error);
        }
    },
);

export { timeBlockRouter };
