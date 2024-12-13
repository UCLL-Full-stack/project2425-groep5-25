import MainLayout from '@components/layout/MainLayout';
import ProjectOverviewTable from '@components/projects/ProjectOverviewTable';
import ProjectSidePanel from '@components/projects/ProjectSidePanel';
import { projectService } from '@services/projectService';
import { userService } from '@services/userService';
import styles from '@styles/home.module.css';
import userTokenInfo from 'hooks/userTokenInfo';
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
                userService.getAllUsersIdName(),
                projectService.getAllProjects(),
            ]);

            const [userIdNames, projects] = await Promise.all([
                handleResponse(usersResponse),
                handleResponse(projectsResponse),
            ]);

            return { userIdNames, projects };
        } catch (error) {
            console.error('Error fetching data', error);
            return null;
        }
    };

    const { data, isLoading } = useSWR('usersAndProjects', getUsersAndProjects);

    useInterval(() => {
        mutate('usersAndProjects', getUsersAndProjects());
    }, 1000);

    const getPageTitle = () => {
        if (userRole === 'user') {
            return 'My Projects';
        }
        return 'Projects';
    };

    return (
        <>
            <MainLayout title="Projects" description="Project tracker projects">
                <main className={styles.main}>
                    <div className="d-flex flex-column w-100" style={{ gap: '0.5rem' }}>
                        <div className={styles.projectCard}>
                            <span>
                                <h4>{getPageTitle()}</h4>
                            </span>

                            {data && userRole === 'admin' && (
                                <button
                                    onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
                                    className={styles.button}>
                                    Add Project
                                </button>
                            )}
                        </div>

                        <hr />

                        {isLoading && <p className="text-green-800">Loading the page</p>}

                        {data && (
                            <>
                                <ProjectOverviewTable projects={data.projects} />
                                {isSidePanelOpen && (
                                    <ProjectSidePanel
                                        userIdNames={data.userIdNames}
                                        onClose={() => setIsSidePanelOpen(!isSidePanelOpen)}
                                        onProjectCreated={getUsersAndProjects}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </main>
            </MainLayout>
        </>
    );
};

export default Home;
