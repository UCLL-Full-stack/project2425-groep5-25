import styles from '@styles/TimeBlock.module.css';
import { TimeBlockDto } from '@types';
import { hexToRgba } from 'utils/optionFormatters';
import { calculateDuration, formatTime } from 'utils/TimeBlock.utils';

type props = {
    timeBlock: TimeBlockDto;
};

const TimeBlock: React.FC<props> = ({ timeBlock }) => {
    return (
        <>
            <div
                className={styles.container}
                style={{
                    borderColor: timeBlock.project.color,
                    backgroundColor: hexToRgba(timeBlock.project.color, 0.5),
                }}>
                <div className={styles.innerContainer}>
                    <span>{timeBlock.project.name}</span>
                </div>
                <div className={styles.innerContainer}>
                    <span>{`${formatTime(timeBlock.startTime)} - ${formatTime(timeBlock.endTime)}`}</span>
                    <span>{calculateDuration(timeBlock.startTime, timeBlock.endTime)}</span>
                </div>
            </div>
        </>
    );
};

export default TimeBlock;
