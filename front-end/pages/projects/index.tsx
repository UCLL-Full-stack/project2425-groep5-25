import Head from "next/head";
import Header from "@components/header";
import styles from "@styles/home.module.css";
import ProjectService from "@services/ProjectService";
import { useEffect, useState } from "react";
import { ProjectUserCount } from "@types";
import ProjectOverviewTable from "@components/projects/ProjectOverviewTable";

const Home: React.FC = () => {
  const [projects, setProjects] = useState<ProjectUserCount[]>([]);

  const getAllProjectsUserCount = async () => {
    const projects = await ProjectService.getAllProjectsUserCount();
    setProjects(projects);
  };

  useEffect(() => {
    getAllProjectsUserCount();
  }, []);

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
        <span>
          <h1>Work Projects</h1>
        </span>

        {projects && (
          <ProjectOverviewTable projects={projects} />
        )}
      </main>
    </>
  );
};

export default Home;
