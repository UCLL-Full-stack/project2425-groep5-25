import Head from "next/head";
import styles from "@styles/home.module.css";

const Home: React.FC = () => {
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
      </main>
    </>
  );
};

export default Home;
