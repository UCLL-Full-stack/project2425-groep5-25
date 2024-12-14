import ProjectOverviewTable from '@components/projects/ProjectOverviewTable';
import ProjectSidePanel from '@components/projects/ProjectSidePanel';
import { projectService } from '@services/projectService';
import { userService } from '@services/userService';
import styles from '@styles/home.module.css';
import userTokenInfo from 'hooks/userTokenInfo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';
import { handleResponse } from 'utils/responseUtils';

const Home: React.FC = () => {
    const { userRole, userName, userFullName, userToken } = userTokenInfo();
    const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(false);

    const getUsersAndProjects = async () => {
        try {
            const [usersResponse, projectsResponse] = await Promise.all([
                userService.getAllUsersIdName(), // 403 error
                projectService.getAllProjects(),
            ]);

            const [users, projects] = await Promise.all([
                handleResponse(usersResponse),
                handleResponse(projectsResponse),
            ]);

            return { users, projects };
        } catch (error) {
            console.error('Error fetching data', error);
            return null;
        }
    };

    const { data, error, isLoading } = useSWR('usersAndProjects', getUsersAndProjects);

    useInterval(() => {
        mutate('usersAndProjects', getUsersAndProjects());
    }, 1000);

    return (
        <>
            <Head>
                <title>Projects</title>
                <meta name="description" content="Project tracker application" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className="d-flex flex-column w-100" style={{ gap: '0.5rem' }}>
                    <div className={styles.projectCard}>
                        <span>
                            <h4>Projects</h4>
                        </span>

                        {data && (
                            <button
                                onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
                                className={styles.button}>
                                Add Project
                            </button>
                        )}
                    </div>

                    <hr />

                    {isLoading && <p className="text-green-800">Loading the page</p>}

                    {data && <ProjectOverviewTable projects={data.projects} />}

                    {data && isSidePanelOpen && (
                        <ProjectSidePanel
                            userIdNames={data.users}
                            onClose={() => setIsSidePanelOpen(!isSidePanelOpen)}
                            onProjectCreated={getUsersAndProjects}
                        />
                    )}
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
