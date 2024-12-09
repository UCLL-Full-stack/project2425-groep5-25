import Workday from '@components/workWeek/WorkDay';
import { workDayService } from '@services/workDayService';
import styles from '@styles/home.module.css';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { WorkDayOutput } from 'types/output';

const getStartAndEndOfWeek = (date: Date) => {
    const startDate = new Date(date);
    const endDate = new Date(date);

    // Set the date to the previous Monday (0 is Sunday, 1 is Monday, etc.)
    const dayOfWeek = startDate.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Calculate the difference from Monday
    startDate.setDate(startDate.getDate() + diffToMonday);

    // Set the date to the following Sunday
    endDate.setDate(startDate.getDate() + 6);

    return {
        start: startDate.toISOString().split('T')[0], // Format date to YYYY-MM-DD
        end: endDate.toISOString().split('T')[0], // Format date to YYYY-MM-DD
    };
};

const Home: React.FC = () => {
    const [workDays, setWorkDays] = useState<WorkDayOutput[]>([]);
    const [currentWeekStart, setCurrentWeekStart] = useState<string>('');
    const [currentWeekEnd, setCurrentWeekEnd] = useState<string>('');

    const getWorkWeekByDates = async (start: string, end: string) => {
        const [response] = await Promise.all([workDayService.getWorkWeekByDates(start, end)]);
        const [workDays] = await Promise.all([response.json()]);
        setWorkDays(workDays);
    };

    // Calculate the start and end dates of the current week
    const updateWeek = (date: Date) => {
        const { start, end } = getStartAndEndOfWeek(date);
        setCurrentWeekStart(start);
        setCurrentWeekEnd(end);
        getWorkWeekByDates(start, end);
    };

    // Navigate to the previous week
    const goToPreviousWeek = () => {
        const currentDate = new Date(currentWeekStart);
        currentDate.setDate(currentDate.getDate() - 7); // Move one week back
        updateWeek(currentDate);
    };

    // Navigate to the next week
    const goToNextWeek = () => {
        const currentDate = new Date(currentWeekStart);
        currentDate.setDate(currentDate.getDate() + 7); // Move one week forward
        updateWeek(currentDate);
    };

    useEffect(() => {
        // Initialize with the current week
        updateWeek(new Date());
    }, []);

    return (
        <>
            <Head>
                <title>Time Tracker</title>
                <meta name="description" content="Time tracker application" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1>Workdays</h1>

                {/* Week Navigation Controls */}
                <div className={styles.weekNavigation}>
                    <button onClick={goToPreviousWeek}>Previous Week</button>
                    <span>{`Week: ${currentWeekStart} - ${currentWeekEnd}`}</span>
                    <button onClick={goToNextWeek}>Next Week</button>
                </div>

                <div className="d-flex gap-3">
                    {workDays.length > 0 ? (
                        workDays.map((workday) => <Workday key={workday.id} workday={workday} />)
                    ) : (
                        <p>No workdays available for this week</p>
                    )}
                </div>
            </main>
        </>
    );
};

export default Home;
