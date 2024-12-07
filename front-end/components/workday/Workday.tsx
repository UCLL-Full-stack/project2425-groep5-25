import styles from '@styles/Workday.module.css';
import { TimeBlockDto, WorkDayDto } from '@types';
import TimeBlock from './TimeBlock';

type props = {
    workday: WorkDayDto;
    timeBlocks: TimeBlockDto[];
};

const Workday: React.FC<props> = ({ workday, timeBlocks }) => {
    const getDayName = (date: Date): string => {
        const days = ['ZO', 'MA', 'DI', 'WO', 'DO', 'VR', 'ZA'];
        return days[date.getDay()];
    };

    const getDateNumber = (date: Date): number => {
        return date.getDate();
    };

    const formatTime = (decimalHours: number): string => {
        const hours = Math.floor(decimalHours);
        const minutes = Math.round((decimalHours - hours) * 60);
        return `${hours}:${minutes.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.informationContainer}>
                    <span>
                        {getDayName(workday.date)} {getDateNumber(workday.date)}
                    </span>
                    <span>
                        {formatTime(workday.achievedHours)} / {formatTime(workday.expectedHours)}
                    </span>
                </div>
                <div className={styles.timeBlocksContainer}>
                    {timeBlocks.map((timeBlock) => (
                        <TimeBlock key={timeBlock.id} timeBlock={timeBlock} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Workday;
