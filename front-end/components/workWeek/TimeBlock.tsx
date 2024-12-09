import styles from '@styles/TimeBlock.module.css';
import { TimeBlockOutput } from '@types';
import { calculateDuration, formatTime } from 'utils/Date.utils';
import { hexToRgba } from 'utils/optionFormatters';

type props = {
    timeBlock: TimeBlockOutput;
};

const TimeBlock: React.FC<props> = ({ timeBlock }) => {
    if (!timeBlock.endTime) return null;

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
