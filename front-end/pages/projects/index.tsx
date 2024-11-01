import Head from "next/head";
import Image from "next/image";
import Header from "@components/header";
import styles from "@styles/home.module.css";
import { ProjectDto } from "@types"; 
import { Project } from "@types";
import ProjectService from "@services/ProjectService";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null); 

  const getProjects = async () => {
    try {
      const response = await ProjectService.getAllProjects();
      console.log(response); 
      const data = await response.json();
      const simplifiedProjects = data.map((project: any) => ({
        name: project.name,
        color: project.color,
        userCount: project.users.length, // Count of users
    }));
      setProjects(simplifiedProjects); 
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects."); // Set error state
    }
  };

  useEffect(() => {
    getProjects(); 
  }, []);

  return (
    <>
      <Head>
        <title>Project Tracker</title>
        <meta name="description" content="Project tracker application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <span>
          <Image
            src="/images/Logo-Icon.png"
            alt="Project Tracker Logo"
            className={styles.vercelLogo}
            width={125}
            height={125}
            priority
          />
          <h1>Welcome!</h1>
        </span>

        <div className={styles.projectTable}>
          <h2>Projects:</h2>
          {error && <p style={{ color: "red" }}>{error}</p>} 
          {projects.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Color</th> 
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.name}> 
                    <td>{project.name}</td> 
                    <td>{project.color}</td>
                    <td>{project.userCount}</td> 
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No projects available.</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
