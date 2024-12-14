import WeekPaginator from '@components/paginator/WeekPaginator';
import Workday from '@components/workWeek/WorkDay';
import { workDayService } from '@services/workDayService';
import styles from '@styles/home.module.css';
import { WorkDayOutput } from '@types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getStartAndEndOfWeek } from 'utils/dateTimeUtils';

const Home: React.FC = () => {
    const [workDays, setWorkDays] = useState<WorkDayOutput[]>([]);
    const [currentWeekStart, setCurrentWeekStart] = useState<string>('');
    const [currentWeekEnd, setCurrentWeekEnd] = useState<string>('');

    const getWorkWeekByDates = async (start: string, end: string) => {
        const [response] = await Promise.all([workDayService.getWorkWeekByDates(start, end)]);
        const [workDays] = await Promise.all([response.json()]);
        setWorkDays(workDays);
    };

    const updateWeek = (start: string, end: string) => {
        setCurrentWeekStart(start);
        setCurrentWeekEnd(end);
        getWorkWeekByDates(start, end);
    };

    const resetToCurrentWeek = () => {
        const today = new Date();
        const { start, end } = getStartAndEndOfWeek(today);
        updateWeek(start, end);
    };

    useEffect(() => {
        resetToCurrentWeek();
    }, []);

    return (
        <>
            <Head>
                <title>Workdays</title>
                <meta name="description" content="Time tracker workdays" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1>Workdays</h1>

                <div className="d-flex gap-3 flex-column">
                    <WeekPaginator
                        currentWeekStart={currentWeekStart}
                        currentWeekEnd={currentWeekEnd}
                        updateWeek={updateWeek}
                        resetToCurrentWeek={resetToCurrentWeek}
                    />

                    <div className="d-flex gap-3">
                        {workDays.length > 0 ? (
                            workDays.map((workday) => (
                                <Workday key={workday.id} workday={workday} />
                            ))
                        ) : (
                            <p>No workdays available for this week</p>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;
export const getServerSideProps = async (context: { locale: any }) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};
