import MainLayout from '@components/layout/MainLayout';

const Home: React.FC = () => {
    return (
        <MainLayout title="Home" description="Project tracker Home">
            <div className="flex justify-center w-full py-6">
                <div className="text-center max-w-3xl w-full">
                    <p className="text-lg text-gray-700">
                        This will be our main page, in the future, it remains empty for now. We make
                        use of a fake database, and any values or things stored here will not be
                        permanent.
                    </p>
                </div>
            </div>
        </MainLayout>
    );
};

export default Home;
