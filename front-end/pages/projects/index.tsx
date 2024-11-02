import Head from "next/head";
import Header from "@components/header";
import styles from "@styles/home.module.css";
import ProjectService from "@services/ProjectService";
import { useEffect, useState, useRef } from "react";
import { Color, IdName, ProjectInputDto, ProjectUserCountDto } from "@types";
import ProjectOverviewTable from "@components/projects/ProjectOverviewTable";
import UserService from "@services/UserService";
import ProjectSidePanel from "@components/projects/ProjectSidePanel";

const Home: React.FC = () => {
  const [userIdNames, setUserIdNames] = useState<IdName[]>([]);
  const [projects, setProjects] = useState<ProjectUserCountDto[]>([]);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(false);

  const getAllUsersIdName = async () => {
    const response = await UserService.getAllUsersIdName();
    const users = await response.json();
    setUserIdNames(users);
  };

  const getAllProjectsUserCount = async () => {
    const projects = await ProjectService.getAllProjectsUserCount();
    setProjects(projects);
  };

  useEffect(() => {
    getAllUsersIdName();
    getAllProjectsUserCount();
  }, []);

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  return (
    <>
      <Head>
        <title>Projects</title>
        <meta name="description" content="Project tracker application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className="d-flex flex-column" style={{ gap: '1rem' }}>
          <div className={styles.projectCard}>
            <span>
              <h1>Work Projects</h1>
            </span>

            <button onClick={toggleSidePanel} className={styles.button}>
              Add Project
            </button>
          </div>

          {isSidePanelOpen && (
            <ProjectSidePanel
              userIdNames={userIdNames}
              onClose={() => setIsSidePanelOpen(false)}
              onProjectCreated={() => getAllProjectsUserCount()}
            />
          )}

          {projects && <ProjectOverviewTable projects={projects} />}
        </div>
      </main>
    </>
  );
};

export default Home;
