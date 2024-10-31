import Head from "next/head";
import Image from "next/image";
import Header from "@components/header";
import styles from "@styles/home.module.css";
import { useEffect, useState } from "react";
import { TimeBlock } from "@types";
import TimeBlockService from "@services/TimeBlockService";

const Home: React.FC = () => {
  const [timeBlocks, setTimeBlocks] = useState<Array<TimeBlock>>([]);

  const getTimeBlocks = async () => {
    const [response] = await Promise.all([TimeBlockService.getAllTimeBlocks()]);
    const [json] = await Promise.all([response.json()]);
    setTimeBlocks(json);
  };

  useEffect(() => {
    getTimeBlocks();
  }, []);

  return (
    <>
      <Head>
        <title>Time Tracker</title>
        <meta name="description" content="Time tracker application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <span>
          <Image
            src="/images/Logo-Icon.png"
            alt="Time Tracker Logo"
            className={styles.vercelLogo}
            width={125}
            height={125}
            priority
          />
          <h1>Welcome!</h1>
        </span>

        <div className={styles.timeBlockTable}>
          <h2>Time Blocks:</h2>
          {timeBlocks.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                </tr>
              </thead>
              <tbody>
                {timeBlocks.map((timeBlock) => (
                  <tr key={timeBlock.id}>
                    <td>{timeBlock.id}</td>
                    <td>{timeBlock.startTime.toString()}</td>
                    <td>
                      {timeBlock.endTime ? timeBlock.endTime.toString() : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No time blocks available.</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
