import Head from "next/head";
import Header from "@components/header";
import styles from "@styles/home.module.css";
import ProjectService from "@services/ProjectService";
import { useEffect, useState, useRef } from "react";
import { ProjectUserCount } from "@types";
import ProjectOverviewTable from "@components/projects/ProjectOverviewTable";
import { ProjectInputDto } from "@types";

const Home: React.FC = () => {
  const [projects, setProjects] = useState<ProjectUserCount[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Color options with hex codes
  const COLORS = [
    { name: "Red", hex: "#FF0000" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Green", hex: "#00FF00" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Orange", hex: "#FFA500" },
    { name: "Purple", hex: "#800080" },
  ];

  const nameRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLSelectElement>(null);
  const usersRef = useRef<HTMLInputElement>(null);


  const getAllProjectsUserCount = async () => {
    const projects = await ProjectService.getAllProjectsUserCount();
    setProjects(projects);
  };
  const createProject = async () => {
    const formData: ProjectInputDto = {
      name: nameRef.current?.value || "",
      color: colorRef.current?.value || "",
      users: usersRef.current?.value
        ? usersRef.current.value.split(",").map(Number)
        : [],
    };

    try {
      await ProjectService.createProject(formData);
      //await getProjects();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error creating project:", err);
      setError("Failed to create project.");
    }
  };


  useEffect(() => {
    //getProjects(); 
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

        <div className={styles.projectForm}>
          <h2>Create a New Project</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              createProject();
            }}
          >
            <label>
              Project Name:
              <input type="text" ref={nameRef} required />
            </label>

            <label>
              Color:
              <select ref={colorRef} required>
                <option value="" disabled>Select a color</option>
                {COLORS.map((color) => (
                  <option key={color.hex} value={color.hex} style={{ backgroundColor: color.hex, color: "#FFFFFF" }}>
                    {color.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              User IDs :
              <input type="text" ref={usersRef} placeholder="e.g., 1,2,3" />
            </label>

            <button type="submit">Create Project</button>
          </form>

          {success && (
            <div style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              padding: "10px 20px",
              backgroundColor: "#4caf50",
              color: "white",
              borderRadius: "5px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
            }}>
              <p>Project created successfully!</p>
            </div>
          )}
        </div>

        {projects && (
          <ProjectOverviewTable projects={projects} />
        )}
      </main>
    </>
  );
};

export default Home;
