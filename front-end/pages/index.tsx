import MainLayout from '@components/layout/MainLayout';
import styles from '@styles/home.module.css';

const Home: React.FC = () => {
    return (
        <>
            <MainLayout title="Home" description="Time tracker home">
                <main className={styles.main}>
                    <span>
                        <h1>Welcome!</h1>
                    </span>

                    <div className={styles.description}>
                        <p>
                            This will be our main page, in the future, it remains empty for now. We
                            make use of a of fake database, values or things stored will not be
                            permanent.
                        </p>
                    </div>
                </main>
            </MainLayout>
        </>
    );
};

export default Home;
