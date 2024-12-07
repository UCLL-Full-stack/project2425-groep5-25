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
import { Role } from '../types';

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
workDayRouter.get(
    '',
    async (
        req: Request & { auth: { userId: number; role: Role } },
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { userId, role } = req.auth;
            const workDays = await workDayService.getAllWorkDays();
            res.status(200).json(workDays);
        } catch (error) {
            next(error);
        }
    },
);

export { workDayRouter };
