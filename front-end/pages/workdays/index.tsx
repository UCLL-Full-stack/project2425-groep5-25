import MainLayout from '@components/layout/MainLayout';
import WeekPaginator from '@components/shared/WeekPaginator';
import Workday from '@components/workWeek/WorkDay';
import { workDayService } from '@services/workDayService';
import { WorkDayOutput } from '@types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';
import { getStartAndEndOfWeek } from 'utils/dateTimeUtils';
import { handleResponse } from 'utils/responseUtils';

const Home: React.FC = () => {
    const { t } = useTranslation();
    const [currentWeekStart, setCurrentWeekStart] = useState<string>('');
    const [currentWeekEnd, setCurrentWeekEnd] = useState<string>('');

    const updateWeek = (start: string, end: string) => {
        setCurrentWeekStart(start);
        setCurrentWeekEnd(end);
    };

    const resetToCurrentWeek = () => {
        const today = new Date();
        const { start, end } = getStartAndEndOfWeek(today);
        updateWeek(start, end);
    };

    useEffect(() => {
        resetToCurrentWeek();
    }, []);

    const getWorkWeekByDates = async (start: string, end: string) => {
        try {
            const [workDayResponse] = await Promise.all([
                workDayService.getWorkWeekByDates(start, end),
            ]);

            const [workDays] = await Promise.all([handleResponse(workDayResponse)]);

            return { workDays };
        } catch (error) {
            console.error(t('error.fetchingData'), error);
            return null;
        }
    };

    const { data, isLoading } = useSWR(
        currentWeekStart && currentWeekEnd ? 'workWeekByDates' : null,
        () => getWorkWeekByDates(currentWeekStart, currentWeekEnd),
    );

    useInterval(() => {
        if (currentWeekStart && currentWeekEnd) {
            mutate('workWeekByDates', getWorkWeekByDates(currentWeekStart, currentWeekEnd));
        }
    }, 1000);

    return (
        <>
            <MainLayout
                title={t('workdays.title')}
                description={t('workdays.description')}
                isLoading={isLoading}
                titleContent={
                    <WeekPaginator
                        currentWeekStart={currentWeekStart}
                        currentWeekEnd={currentWeekEnd}
                        updateWeek={updateWeek}
                        resetToCurrentWeek={resetToCurrentWeek}
                    />
                }>
                <div className="flex gap-3 flex-wrap">
                    {data && data.workDays.length > 0 ? (
                        data.workDays.map((workday: WorkDayOutput) => (
                            <Workday key={workday.id} workday={workday} />
                        ))
                    ) : (
                        <p className="text-center text-gray-500">{t('workdays.noWorkdays')}</p>
                    )}
                </div>
            </MainLayout>
        </>
    );
};

export const getServerSideProps = async (context: { locale: any }) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

export default Home;
