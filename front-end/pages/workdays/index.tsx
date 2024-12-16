import MainLayout from '@components/layout/MainLayout';
import WeekPaginator from '@components/shared/WeekPaginator';
import Workweek from '@components/workWeek/WorkWeek';
import { workDayService } from '@services/workDayService';
import handleResponse from 'hooks/handleResponse';
import handleTokenInfo from 'hooks/handleTokenInfo';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';
import { getStartAndEndOfWeek } from 'utils/dateTimeUtils';

const Home: React.FC = () => {
    const { t } = useTranslation();
    const { handleApiResponse } = handleResponse();
    const { userRole, userName, userFullName, userToken } = handleTokenInfo();
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
            const workDayResponse = await workDayService.getWorkWeekByDates(start, end);
            const workDays = await handleApiResponse(workDayResponse);
            return { workDays };
        } catch (error) {
            console.error('Error fetching data', error);
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
                title={t('pages.workDays.title')}
                description={t('pages.workDays.description')}
                isLoading={isLoading}
                titleContent={
                    <WeekPaginator
                        currentWeekStart={currentWeekStart}
                        currentWeekEnd={currentWeekEnd}
                        updateWeek={updateWeek}
                        resetToCurrentWeek={resetToCurrentWeek}
                    />
                }>
                {data && <Workweek workDays={data.workDays}></Workweek>}
            </MainLayout>
        </>
    );
};

export const getServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'nl', ['common'])),
        },
    };
};

export default Home;
