/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     WorkDay:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier of the work day
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the work day
 *         expectedHours:
 *           type: number
 *           format: float
 *           description: The expected number of hours worked on the work day
 *         achievedHours:
 *           type: number
 *           format: float
 *           description: The actual number of hours worked, if available
 *         user:
 *           $ref: '#/components/schemas/User'
 *         timeBlocks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TimeBlock'
 *     WorkDayResponse:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/WorkDay'
 *   responses:
 *     UnauthorizedError:
 *       description: Unauthorized access due to missing or invalid token.
 *     NotFoundError:
 *       description: The requested resource was not found.
 *     ValidationError:
 *       description: Invalid input or data format.
 */
import express, { NextFunction, Request, Response } from 'express';
import { workDayService } from '../service/workDay.service';
import { JwtToken } from '../types';

const workDayRouter = express.Router();

/**
 * @swagger
 * /workdays:
 *   get:
 *     summary: Retrieve a list of all work days
 *     tags: [WorkDays]
 *     security:
 *       - bearerAuth: []  # Adding the security section for Bearer token
 *     responses:
 *       200:
 *         description: A list of all work days.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkDayResponse'
 */
workDayRouter.get('', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqHeader = req as Request & { auth: JwtToken };
        const workDays = await workDayService.getAllWorkDays();
        res.status(200).json(workDays);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /workdays/{start}/{end}:
 *   get:
 *     summary: Retrieve work days within a specific date range
 *     description: Retrieves work days for a user within the given date range, identified by start and end dates.
 *     tags: [WorkDays]
 *     security:
 *       - bearerAuth: []  # Enabling Bearer Token authentication
 *     parameters:
 *       - name: start
 *         in: path
 *         required: true
 *         description: Start date for the work days query (e.g., YYYY-MM-DD).
 *         schema:
 *           type: string
 *           format: date
 *       - name: end
 *         in: path
 *         required: true
 *         description: End date for the work days query (e.g., YYYY-MM-DD).
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: A list of work days within the specified date range.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkDayResponse'
 */
workDayRouter.get('/:start/:end', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqHeader = req as Request & { auth: JwtToken };
        const { start, end } = req.params;
        const workDays = await workDayService.getWorkWeekByDates({
            start,
            end,
            auth: reqHeader.auth,
        });
        res.status(200).json(workDays);
    } catch (error) {
        next(error);
    }
});

export { workDayRouter };
