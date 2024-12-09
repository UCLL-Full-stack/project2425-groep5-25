import ProjectOverviewTable from '@components/projects/ProjectOverviewTable';
import ProjectSidePanel from '@components/projects/ProjectSidePanel';
import { projectService } from '@services/projectService';
import { userService } from '@services/userService';
import styles from '@styles/home.module.css';
import { IdName, ProjectInput, ProjectOutput } from '@types';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
    const [userIdNames, setUserIdNames] = useState<IdName[]>([]);
    const [projects, setProjects] = useState<ProjectOutput[]>([]);
    const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(false);

    const getAllUsersIdName = async () => {
        const [response] = await Promise.all([userService.getAllUsersIdName()]);
        const [users] = await Promise.all([response.json()]);
        setUserIdNames(users);
    };

    const getAllProjects = async () => {
        const [response] = await Promise.all([projectService.getAllProjects()]);
        const [projects] = await Promise.all([response.json()]);
        setProjects(projects);
    };

    const addProject = (project: ProjectInput) => {
        setProjects((x) => [...x, project]);
    };

    useEffect(() => {
        getAllUsersIdName();
        getAllProjects();
    }, []);

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

                        <button
                            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
                            className={styles.button}>
                            Add Project
                        </button>
                    </div>

                    <hr />

                    {isSidePanelOpen && (
                        <ProjectSidePanel
                            userIdNames={userIdNames}
                            onClose={() => setIsSidePanelOpen(false)}
                            addProject={addProject}
                            onProjectCreated={() => getAllProjects()}
                        />
                    )}

                    {projects && <ProjectOverviewTable projects={projects} />}
                </div>
            </main>
        </>
    );
};

export default Home;
