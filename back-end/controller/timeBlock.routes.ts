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
 *     Project:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier of the project
 *         name:
 *           type: string
 *           description: Name of the project
 *         description:
 *           type: string
 *           description: Detailed description of the project
 *     WorkDay:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier of the work day
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the work day
 *         user:
 *           $ref: '#/components/schemas/User'
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier of the user
 *         name:
 *           type: string
 *           description: Name of the user
 *         email:
 *           type: string
 *           description: Email address of the user
 *     ScheduleComponent:
 *       type: object
 *       properties:
 *         projectId:
 *           type: integer
 *           description: ID of the associated project
 *     responses:
 *       UnauthorizedError:
 *         description: Unauthorized access due to missing or invalid token.
 *       NotFoundError:
 *         description: The requested resource was not found.
 *       ValidationError:
 *         description: Invalid input or data format.
 */
import express, { NextFunction, Request, Response } from 'express';
import { timeBlockService } from '../service/timeBlock.service';
import { JwtToken, TimeBlockInput } from '../types';

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
timeBlockRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqHeader = req as Request & { auth: JwtToken };
        const timeBlocks = await timeBlockService.getAllTimeBlocks();
        res.status(200).json(timeBlocks);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /timeblocks:
 *   post:
 *     summary: Create a new time block
 *     description: Create a new time block, linking it to a project and a work day.
 *     tags:
 *       - TimeBlocks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ScheduleComponent'
 *     responses:
 *       201:
 *         description: Time block created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimeBlock'
 */
timeBlockRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqHeader = req as Request & { auth: JwtToken };
        const timeBlockInput = <TimeBlockInput>req.body;
        const result = await timeBlockService.createTimeBlock({
            auth: reqHeader.auth,
            timeBlockInput,
        });
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /timeblocks:
 *   put:
 *     summary: Create a new time block
 *     description: Create a new time block, linking it to a project and a work day.
 *     tags:
 *       - TimeBlocks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ScheduleComponent'
 *     responses:
 *       200:
 *         description: Time block created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimeBlock'
 */
timeBlockRouter.put('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqHeader = req as Request & { auth: JwtToken };
        const result = await timeBlockService.updateTimeBlock({
            auth: reqHeader.auth,
        });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { timeBlockRouter };
