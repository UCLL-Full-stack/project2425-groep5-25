import Workday from '@components/workday/Workday';
import { timeBlockService } from '@services/timeBlockService';
import styles from '@styles/home.module.css';
import { TimeBlockDto } from '@types';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
    const [workWeek, setWorkWeek] = useState<TimeBlockDto[]>([]);

    const getCurrentWorkWeek = async () => {
        const [response] = await Promise.all([timeBlockService.getCurrentWorkWeek()]);
        const [timeBlocks] = await Promise.all([response.json()]);

        // Ensure all dates are properly converted to Date objects
        const normalizedTimeBlocks = timeBlocks.map((timeBlock: TimeBlockDto) => ({
            ...timeBlock,
            workDay: {
                ...timeBlock.workDay,
                date: new Date(timeBlock.workDay.date), // Convert the date to Date object
            },
            startTime: new Date(timeBlock.startTime), // Ensure startTime is Date object
            endTime: new Date(timeBlock.endTime), // Ensure endTime is Date object
        }));

        setWorkWeek(normalizedTimeBlocks);
        console.log(normalizedTimeBlocks);
    };

    useEffect(() => {
        getCurrentWorkWeek();
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
                <span>
                    <h1>Workdays!</h1>
                </span>

                <div className={styles.timeBlocksContainer}>
                    {workWeek.map((timeBlock) => (
                        <Workday
                            key={timeBlock.workDay.id}
                            workday={timeBlock.workDay}
                            timeBlocks={workWeek.filter(
                                (block) => block.workDay.id === timeBlock.workDay.id,
                            )}
                        />
                    ))}
                </div>
            </main>
        </>
    );
};

export default Home;
