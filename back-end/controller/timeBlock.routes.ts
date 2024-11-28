import express, { NextFunction, Request, Response } from 'express';
import timeBlockService from '../service/timeBlock.service';

const timeBlockRouter = express.Router();

/**
 * @swagger
 * /timeblocks:
 *   get:
 *     summary: Retrieve a list of time blocks
 *     description: Fetch all time blocks from the database.
 *     responses:
 *       200:
 *         description: A list of time blocks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique identifier of the time block
 *                   startTime:
 *                     type: string
 *                     format: date-time
 *                     description: The start time of the time block
 *                   endTime:
 *                     type: string
 *                     format: date-time
 *                     description: The end time of the time block
 *                   projectId:
 *                     type: integer
 *                     description: The project associated with the time block
 *                   workDayId:
 *                     type: integer
 *                     description: The work day associated with the time block
 *       500:
 *         description: Internal server error
 */
timeBlockRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const timeBlocks = await timeBlockService.getAllTimeBlocks();
        res.status(200).json(timeBlocks);
    } catch (error) {
        next(error);
    }
});

export { timeBlockRouter };
