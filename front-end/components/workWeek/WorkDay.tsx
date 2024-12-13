import styles from '@styles/Workday.module.css';
import { WorkDayOutput } from '@types';
import { dateUtils } from 'utils/date';
import TimeBlock from './TimeBlock';

type props = {
    workday: WorkDayOutput;
};

const Workday: React.FC<props> = ({ workday }) => {
    const dateNr = dateUtils.getDate(workday.date);
    const dateName = dateUtils.getDayInitials(workday.date);

    let totalAchievedHours = 0;
    try {
        totalAchievedHours =
            workday.timeBlocks?.reduce((total, timeBlock) => {
                const { hours, minutes } = dateUtils.calcTimeBetween(
                    timeBlock.startTime,
                    timeBlock.endTime || dateUtils.getLocalCurrentDate(),
                );
                const totalMinutes = total + hours * 60 + minutes;
                return totalMinutes;
            }, 0) ?? 0;
    } catch (error) {
        console.error(error);
    }

    const expectedHours = dateUtils.numberToDateString(workday.expectedHours);
    const achievedHours = dateUtils.numberToDateString(totalAchievedHours / 60);

    return (
        <>
            {workday && (
                <div className={styles.container}>
                    <div className={styles.informationContainer}>
                        <span>
                            {dateName} {dateNr}
                        </span>
                        <span>
                            {achievedHours} / {expectedHours}
                        </span>
                    </div>
                    <div className={styles.timeBlocksContainer}>
                        {workday.timeBlocks &&
                            workday.timeBlocks.length > 0 &&
                            workday.timeBlocks.map((timeBlock) => (
                                <TimeBlock key={timeBlock.id} timeBlock={timeBlock} />
                            ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Workday;
