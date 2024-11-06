import express, { NextFunction, Request, Response } from 'express';
import workDayService from '../service/workDay.service';

const workDayRouter = express.Router();

workDayRouter.get('', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const workDays = await workDayService.getAllWorkDays();
        res.status(200).json(workDays);
    } catch (error) {
        next(error);
    }
});

export { workDayRouter };