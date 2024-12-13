/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     ProjectInput:
 *       type: object
 *       required:
 *         - name
 *         - color
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the project.
 *         color:
 *           type: string
 *           description: The color of the project.
 *           enum: [ "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FFA500", "#800080", "#000000", "#FFFFFF" ]
 *         userIds:
 *           type: array
 *           items:
 *             type: integer
 *           description: Optional array of user IDs associated with the project.
 *     ProjectDto:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *         color:
 *           type: string
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *         createdDate:
 *           type: string
 *           format: date-time
 *         updatedDate:
 *           type: string
 *           format: date-time
 *     ProjectUpdateInput:
 *       type: object
 *       properties:
 *         userIds:
 *           type: array
 *           items:
 *             type: integer
 *           description: List of user IDs to add to the project.
 *     Project:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *           description: The name of the project.
 *         color:
 *           type: string
 *           description: The color of the project.
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *         createdDate:
 *           type: string
 *           format: date-time
 *         updatedDate:
 *           type: string
 *           format: date-time
 *   responses:
 *     UnauthorizedError:
 *       description: Unauthorized access due to missing or invalid token.
 *     NotFoundError:
 *       description: The requested resource was not found.
 *     ValidationError:
 *       description: Invalid input or data format.
 */
import express, { NextFunction, Request, Response } from 'express';
import { projectService } from '../service/project.service';
import { JwtToken, ProjectInput } from '../types';

const projectRouter = express.Router();

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects
 *     description: Retrieve a list of all projects.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of projects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProjectDto'
 */
projectRouter.get(
    '/',
    async (req: Request & { auth: JwtToken }, res: Response, next: NextFunction) => {
        try {
            const projects = await projectService.getAllProjects({ auth: req.auth });
            res.status(200).json(projects);
        } catch (error) {
            next(error);
        }
    },
);

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     description: Create a new project by providing project details such as name, color, and associated user IDs.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectInput'
 *     responses:
 *       201:
 *         description: The project was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectDto'
 */
projectRouter.post(
    '/',
    async (req: Request & { auth: JwtToken }, res: Response, next: NextFunction) => {
        try {
            const projectInput = <ProjectInput>req.body;
            const result = await projectService.createProject(projectInput);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    },
);

export { projectRouter };
