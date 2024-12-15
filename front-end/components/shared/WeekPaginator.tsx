import { useTranslation } from 'next-i18next';
import React from 'react';
import { FaArrowLeft, FaArrowRight, FaCalendarDay } from 'react-icons/fa';
import { formatWeekDisplay, getStartAndEndOfWeek } from 'utils/dateTimeUtils';

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
            <div className="flex items-center w-max">
                <span className="inline-block w-max">
                    {formatWeekDisplay(currentWeekStart, currentWeekEnd)}
                </span>

                <div className="flex justify-between gap-2 w-full">
                    <button
                        className="text-2xl p-2 hover:text-blue-500"
                        onClick={goToPreviousWeek}
                        aria-label={t('weekPageComponent.previousWeek')}>
                        <FaArrowLeft />
                    </button>
                    <button
                        className="text-2xl p-2 hover:text-blue-500"
                        onClick={resetToCurrentWeek}
                        aria-label={t('weekPageComponent.goToCurrentWeek')}>
                        <FaCalendarDay />
                    </button>
                    <button
                        className="text-2xl p-2 hover:text-blue-500"
                        onClick={goToNextWeek}
                        aria-label={t('weekPageComponent.nextWeek')}>
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </>
    );
};

export default WeekPaginator;
