import styles from '@styles/Workday.module.css';
import { WorkDayOutput } from 'types/output';
import TimeBlock from './TimeBlock';

type props = {
    workday: WorkDayOutput;
};

const Workday: React.FC<props> = ({ workday }) => {
    // Ensure the date is a Date object
    const getDayName = (date: string | Date): string => {
        // Parse the date if it's a string
        const dateObj = new Date(date);
        const days = ['ZO', 'MA', 'DI', 'WO', 'DO', 'VR', 'ZA'];
        return days[dateObj.getDay()];
    };

    const getDateNumber = (date: string | Date): number => {
        const dateObj = new Date(date);
        return dateObj.getDate();
    };

    const formatTime = (decimalHours: number): string => {
        const hours = Math.floor(decimalHours);
        const minutes = Math.round((decimalHours - hours) * 60);
        return `${hours}:${minutes.toString().padStart(2, '0')}`;
    };

    const achievedHours = workday.achievedHours ?? 0;

    return (
        <div className={styles.container}>
            <div className={styles.informationContainer}>
                <span>
                    {getDayName(workday.date)} {getDateNumber(workday.date)}
                </span>
                <span>
                    {formatTime(achievedHours)} / {formatTime(workday.expectedHours)}
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
