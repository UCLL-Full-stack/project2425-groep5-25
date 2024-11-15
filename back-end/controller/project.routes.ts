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
 *           description: The color of the project. Should be one of the Color enum values.
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
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 format: int64
 *               username:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 * 
 */

import express, { NextFunction, Request, Response } from 'express';
import projectService from '../service/project.service';
import { ProjectInput } from '../types';

const projectRouter = express.Router();

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Retrieve a list of all projects
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProjectDto'
 *       500:
 *         description: Error occurred while retrieving projects
 */
projectRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projects = await projectService.getAllProjects();
        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
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
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectDto'
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Error occurred while creating project
 */
projectRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    // try {
    //     const projectInput = <ProjectInput>req.body;
    //     const result = await projectService.createProject(projectInput);
    //     res.status(201).json(result);
    // } catch (error) {
    //     next(error);
    // }
});

export { projectRouter };
