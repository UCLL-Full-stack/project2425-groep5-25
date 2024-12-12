/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         userName:
 *           type: string
 *           description: The username of the user.
 *         firstName:
 *           type: string
 *           description: The first name of the user.
 *         lastName:
 *           type: string
 *           description: The last name of the user.
 *         email:
 *           type: string
 *           description: The email address of the user.
 *         role:
 *           type: string
 *           description: The role of the user in the system.
 *           enum: [student, lecturer, admin, guest]
 *     UserInput:
 *       type: object
 *       required:
 *         - userName
 *         - passWord
 *         - email
 *         - firstName
 *         - lastName
 *         - role
 *       properties:
 *         userName:
 *           type: string
 *           description: The username chosen by the user.
 *         passWord:
 *           type: string
 *           description: The password chosen by the user.
 *         firstName:
 *           type: string
 *           description: The first name of the user.
 *         lastName:
 *           type: string
 *           description: The last name of the user.
 *         email:
 *           type: string
 *           description: The email address of the user.
 *         role:
 *           type: string
 *           description: The role of the user (e.g., student, lecturer, admin, guest).
 *           enum: [student, lecturer, admin, guest]
 *     AuthenticationRequest:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *           description: The username of the user.
 *         passWord:
 *           type: string
 *           description: The password of the user.
 *     AuthenticationResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: The response message.
 *         token:
 *           type: string
 *           description: The JWT token for authentication.
 *         userName:
 *           type: string
 *           description: The username of the authenticated user.
 *         fullname:
 *           type: string
 *           description: The full name of the authenticated user.
 *     IdName:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the user.
 *         name:
 *           type: string
 *           description: The concatenated full name of the user.
 *   responses:
 *     UnauthorizedError:
 *       description: Unauthorized access due to missing or invalid token.
 *     NotFoundError:
 *       description: The requested resource was not found.
 *     ValidationError:
 *       description: Invalid input or data format.
 */
import express, { NextFunction, Request, Response } from 'express';
import { userService } from '../service/user.service';
import { JwtToken, UserInput } from '../types';

const userRouter = express.Router();

/**
 * @swagger
 * /users/id-name:
 *   get:
 *     summary: Get all users with id and name only
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Adding security for Bearer token
 *     responses:
 *       200:
 *         description: List of users with id and name only
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/IdName'
 */
userRouter.get(
    '/id-name',
    async (req: Request & { auth: JwtToken }, res: Response, next: NextFunction) => {
        try {
            const users = await userService.getAllUsersIdName();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    },
);

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: User successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const newUser = await userService.userSignUp(userInput);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login using userName and password. Returns a JWT token and user details.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: The userName of the user.
 *               passWord:
 *                 type: string
 *                 description: The password of the user.
 *             required:
 *               - userName
 *               - passWord
 *     responses:
 *       200:
 *         description: Authenticated successfully. Returns a JWT token and user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authenticated Successfully
 *                   description: A success message.
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication.
 *                 userName:
 *                   type: string
 *                   description: The userName of the authenticated user.
 *                 fullname:
 *                   type: string
 *                   description: The full name of the authenticated user.
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const response = await userService.userAuthenticate(userInput);
        res.status(200).json({ message: 'Authenticated Successfully', ...response });
    } catch (error) {
        next(error);
    }
});

export { userRouter };
