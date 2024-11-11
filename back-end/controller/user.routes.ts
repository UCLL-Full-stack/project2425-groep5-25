import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 *
 * components:
 *   schemas:
 *     IdName:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the user
 *           example: 1
 *         name:
 *           type: string
 *           description: Concatenated first and last name of the user
 *           example: "John Doe"
 *
 * /users/id-name:
 *   get:
 *     summary: Get all users with id and name only
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users with id and name only
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/IdName'
 *       500:
 *         description: Internal server error
 */
userRouter.get('/id-name', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

export { userRouter };