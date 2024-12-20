import { dateUtils } from '@utils/date';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { FaArrowLeft, FaArrowRight, FaCalendarDay } from 'react-icons/fa';

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
    const { t } = useTranslation();
    const currentDate = dateUtils.getLocalCurrentDate();

    const goToPreviousWeek = () => {
        currentDate.setDate(currentDate.getDate() - 7);
        const { start, end } = dateUtils.getStartAndEndOfWeek(currentDate);
        updateWeek(start, end);
    };

    const goToNextWeek = () => {
        currentDate.setDate(currentDate.getDate() + 7);
        const { start, end } = dateUtils.getStartAndEndOfWeek(currentDate);
        updateWeek(start, end);
    };

    return (
        <>
            <div className="flex items-center w-max">
                <span className="inline-block w-max">
                    {dateUtils.formatWeekDisplay(currentWeekStart, currentWeekEnd)}
                </span>

                <div className="flex justify-between w-full">
                    <button
                        className="text-2xl p-2 hover:text-blue-500"
                        onClick={goToPreviousWeek}
                        aria-label={t('components.weekPaginator.labels.previousWeek')}>
                        <FaArrowLeft />
                    </button>
                    <button
                        className="text-2xl p-2 hover:text-blue-500"
                        onClick={resetToCurrentWeek}
                        aria-label={t('components.weekPaginator.labels.goToCurrentWeek')}>
                        <FaCalendarDay />
                    </button>
                    <button
                        className="text-2xl p-2 hover:text-blue-500"
                        onClick={goToNextWeek}
                        aria-label={t('components.weekPaginator.labels.nextWeek')}>
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </>
    );
};

export default WeekPaginator;
