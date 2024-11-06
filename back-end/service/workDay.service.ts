import { workDayRouter } from "../controller/workDay.routes";
import { WorkDayDto } from "../dto";
import { WorkDay } from "../model/workDay";
import { mapWorkDay } from "./mapper.service";
import workDayRepository from '../repository/workDay.db';

const getAllWorkDays = (): WorkDayDto[] => {
    try {
        const workDays: WorkDay[] = workDayRepository.getAllWorkDays();
        return workDays.map(mapWorkDay);
    } catch (error) {
        throw new Error('Error occurred at project service. See server log for details');
    }
};

export default {
    getAllWorkDays
};
