import styles from '@styles/WeekPaginator.module.css';
import React from 'react';
import { FaArrowLeft, FaArrowRight, FaCalendarDay } from 'react-icons/fa'; // Added FaCalendarDay
import { formatWeekDisplay, getStartAndEndOfWeek } from 'utils/Date.utils';

type Props = {
    currentWeekStart: string;
    currentWeekEnd: string;
    updateWeek: (start: string, end: string) => void;
    resetToCurrentWeek: () => void;
};

const WeekPaginator: React.FC<Props> = ({
    currentWeekStart,
    currentWeekEnd,
    updateWeek,
    resetToCurrentWeek,
}: Props) => {
    const goToPreviousWeek = () => {
        const currentDate = new Date(currentWeekStart);
        currentDate.setDate(currentDate.getDate() - 7);
        const { start, end } = getStartAndEndOfWeek(currentDate);
        updateWeek(start, end);
    };

    const goToNextWeek = () => {
        const currentDate = new Date(currentWeekStart);
        currentDate.setDate(currentDate.getDate() + 7);
        const { start, end } = getStartAndEndOfWeek(currentDate);
        updateWeek(start, end);
    };

    return (
        <>
            <div className={styles.weekNavigation}>
                <span>{formatWeekDisplay(currentWeekStart, currentWeekEnd)}</span>

                <div className={styles.weekNavigationContainer}>
                    <button
                        className={styles.weekNavigationButton}
                        onClick={goToPreviousWeek}
                        aria-label="Previous Week">
                        <FaArrowLeft />
                    </button>
                    <button
                        className={styles.weekNavigationButton}
                        onClick={resetToCurrentWeek}
                        aria-label="Go to Current Week">
                        <FaCalendarDay />
                    </button>
                    <button
                        className={styles.weekNavigationButton}
                        onClick={goToNextWeek}
                        aria-label="Next Week">
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </>
    );
};

export default WeekPaginator;
