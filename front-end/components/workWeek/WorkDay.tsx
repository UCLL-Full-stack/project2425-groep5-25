import styles from '@styles/Workday.module.css';
import { WorkDayOutput } from '@types';
import { formatDecimalTime, getDateNumber, getDayName } from 'utils/Date.utils';
import TimeBlock from './TimeBlock';

type props = {
    workday: WorkDayOutput;
};

const Workday: React.FC<props> = ({ workday }) => {
    if (!workday) return null;

    const achievedHours = workday.achievedHours ?? 0;

    return (
        <div className={styles.container}>
            <div className={styles.informationContainer}>
                <span>
                    {getDayName(workday.date)} {getDateNumber(workday.date)}
                </span>
                <span>
                    {formatDecimalTime(achievedHours)} / {formatDecimalTime(workday.expectedHours)}
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
    );
};

export default Workday;
