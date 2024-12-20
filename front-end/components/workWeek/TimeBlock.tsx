import { TimeBlockOutput } from '@types';
import { hexToRgba } from '@utils/colorUtils';
import { dateUtils } from '@utils/date';

type props = {
    timeBlock: TimeBlockOutput;
};

const TimeBlock: React.FC<props> = ({ timeBlock }) => {
    const startTime = dateUtils.formatDate(timeBlock.startTime);
    const endTime = dateUtils.formatDate(timeBlock.endTime || dateUtils.getLocalCurrentDate());
    const duration = dateUtils.calcTimeBetweenString(
        timeBlock.startTime,
        timeBlock.endTime || dateUtils.getLocalCurrentDate(),
    );

    return (
        <>
            {timeBlock && timeBlock.endTime && (
                <div
                    className="timeblock-container"
                    style={{
                        borderColor: timeBlock.project.color,
                        backgroundColor: hexToRgba(timeBlock.project.color, 0.5),
                    }}>
                    <div className="timeblock-inner-container">
                        <span>{timeBlock.project.name}</span>
                    </div>
                    <div className="timeblock-inner-container">
                        <span>{`${startTime} - ${endTime}`}</span>
                        <span>{duration}</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default TimeBlock;
