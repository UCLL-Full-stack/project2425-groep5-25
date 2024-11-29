import express, { NextFunction, Request, Response } from 'express';
import { workDayService } from '../service/workDay.service';

const workDayRouter = express.Router();

/**
 * @swagger
 * /workdays:
 *   get:
 *     summary: Retrieve a list of work days
 *     description: Fetch all work days from the database.
 *     responses:
 *       200:
 *         description: A list of work days.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique identifier for the work day
 *                   date:
 *                     type: string
 *                     format: date
 *                     description: The date of the work day
 *                   expectedHours:
 *                     type: number
 *                     format: float
 *                     description: Expected working hours for the day
 *                   achievedHours:
 *                     type: number
 *                     format: float
 *                     description: Achieved working hours for the day
 *                   userId:
 *                     type: integer
 *                     description: ID of the user associated with this work day
 *       500:
 *         description: Internal server error
 */
workDayRouter.get('', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const workDays = await workDayService.getAllWorkDays();
        res.status(200).json(workDays);
    } catch (error) {
        next(error);
    }
});

export { workDayRouter };
