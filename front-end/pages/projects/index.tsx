import Head from "next/head";
import Image from "next/image";
import Header from "@components/header";
import styles from "@styles/home.module.css";
import { ProjectDto, ProjectInputDto } from "@types";
import ProjectService from "@services/ProjectService";
import { useEffect, useState, useRef } from "react";

const Home: React.FC = () => {
  const [projects, setProjects] = useState<ProjectDto[]>([]);
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

  const getProjects = async () => {
    try {
      const response = await ProjectService.getAllProjects();
      const data = await response.json();
      const simplifiedProjects = data.map((project: any) => ({
        name: project.name,
        color: project.color,
        userCount: project.users.length,
      }));
      setProjects(simplifiedProjects);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects.");
    }
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
      await getProjects();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error creating project:", err);
      setError("Failed to create project.");
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

        <div className={styles.projectTable}>
          <h2>Projects:</h2>
          {projects.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Color</th>
                  <th>User Count</th>
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
