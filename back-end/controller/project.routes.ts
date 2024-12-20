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
projectRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqHeader = req as Request & { auth: JwtToken };
        const projects = await projectService.getAllProjects({ auth: reqHeader.auth });
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
projectRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqHeader = req as Request & { auth: JwtToken };
        const projectInput = <ProjectInput>req.body;
        const result = await projectService.createProject({
            auth: reqHeader.auth,
            projectInput,
        });
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /projects/user:
 *   get:
 *     summary: Get all projects for the authenticated user
 *     description: Retrieve a list of all projects associated with the authenticated user.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of projects associated with the authenticated user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProjectDto'
 */
projectRouter.get('/user', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqHeader = req as Request & { auth: JwtToken };
        const projects = await projectService.getAllProjectsByUserId({
            auth: reqHeader.auth,
        });
        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     description: Retrieve the details of a specific project by its ID.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: The unique identifier of the project.
 *     responses:
 *       200:
 *         description: The project details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectDto'
 */
projectRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqHeader = req as Request & { auth: JwtToken };
        const projectId = Number(req.params.id);
        const project = await projectService.getProjectById({
            auth: reqHeader.auth,
            projectId: projectId,
        });
        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /projects:
 *   put:
 *     summary: Update an existing project
 *     description: Update an existing project by providing the project details such as name, color, and associated user IDs. Only users with the appropriate permissions can update the project.
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
 *       200:
 *         description: The project was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectDto'
 */
projectRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqHeader = req as Request & { auth: JwtToken };
        const projectId = Number(req.params.id);
        const projectInput = <ProjectInput>req.body;
        const result = await projectService.updateProject({
            auth: reqHeader.auth,
            projectId,
            projectInput,
        });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete a project by ID
 *     description: Delete a specific project by its ID. Only users with the appropriate permissions (e.g., Admin) can delete a project.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: The unique identifier of the project to be deleted.
 *     responses:
 *       200:
 *         description: The project was successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectDto'
 */
projectRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqHeader = req as Request & { auth: JwtToken };
        const projectId = Number(req.params.id);
        const result = await projectService.deleteProjectById({
            auth: reqHeader.auth,
            projectId,
        });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { projectRouter };
