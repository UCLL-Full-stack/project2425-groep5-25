import React, { useState } from "react";
import Select from "react-select";
import ProjectService from "@services/ProjectService";
import { Color, IdName, ProjectInputDto } from "@types";
import styles from "@styles/ProjectSidePanel.module.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  userIdNames: Array<IdName>;
  onProjectCreated: () => void;
  onClose: () => void;
};

const colorOptions = Object.entries(Color).map(([label, hex]) => ({
  value: hex,
  label: label,
}));

const ProjectSidePanel: React.FC<Props> = ({
  userIdNames,
  onProjectCreated,
  onClose,
}: Props) => {
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<Color>(Color.Red);
  const [userIds, setUserIds] = useState<number[]>([]);

  const userOptions = userIdNames.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData: ProjectInputDto = { name, color, userIds };

    try {
      await ProjectService.createProject(formData);
      onProjectCreated();
      onClose();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <>
      <div className={styles["side-panel"]}>
        <div className={styles["title-container"]}>
          <h2>Create a project</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <form onSubmit={createProject} className={styles["form-container"]}>
          <div className={styles.inputContainer}>
            <label>Project Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter project name"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputContainer}>
            <label>Project Color:</label>
            <Select
              options={colorOptions}
              value={colorOptions.find((option) => option.value === color)}
              onChange={(selectedOption) =>
                setColor(selectedOption?.value as Color)
              }
              placeholder="Select a color"
              required
            />
          </div>

          <div className={styles.inputContainer}>
            <label>Select Users:</label>
            <Select
              options={userOptions}
              isMulti
              placeholder="Select users"
              onChange={(selectedOptions) =>
                setUserIds(
                  selectedOptions.map((option) => option.value as number)
                )
              }
              value={userOptions.filter((option) =>
                userIds.includes(option.value as number)
              )}
            />
          </div>

          <button type="submit" className={styles.button}>
            Create Project
          </button>
        </form>
      </div>
    </>
  );
};

export default ProjectSidePanel;
