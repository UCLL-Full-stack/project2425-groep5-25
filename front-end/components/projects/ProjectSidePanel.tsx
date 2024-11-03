import React, { useState } from "react";
import Select from "react-select";
import ProjectService from "@services/ProjectService";
import { Color, ErrorLabelMessage, IdName, ProjectInputDto } from "@types";
import styles from "@styles/ProjectSidePanel.module.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatOptionLabel } from "utils/optionFormatters";
import ErrorMessage from "@components/shared/ErrorMessage";

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
  const [errorLabelMessage, setErrorLabelMessage] = useState<ErrorLabelMessage>();

  const userOptions = userIdNames.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorLabelMessage(undefined);

    if (!name || name.trim().length < 6) {
      setErrorLabelMessage({
        label: "Invalid Project Name",
        message: "Project name must be at least 6 characters long",
      });
      return;
    }

    if (!color || !Object.values(Color).includes(color)) {
      setErrorLabelMessage({
        label: "Invalid Project Color",
        message: "Please select a color for the project",
      });
      return;
    }

    if (userIds && userIds.length > 0) {
      const uniqueUserIds = new Set(userIds);
      if (uniqueUserIds.size !== userIds.length) {
        setErrorLabelMessage({
          label: "Invalid Project Users",
          message: "You cannot select the same user more than once",
        });
        return;
      }
    }

    try {
      const formData: ProjectInputDto = { name, color, userIds };
      const [response] = await Promise.all([ProjectService.createProject(formData)]);
      const [json] = await Promise.all([response.json()]);
      if (!response.ok) {    
        setErrorLabelMessage({
          label: "Validation Error",
          message:json.message || "An error occurred while creating the project.",
        });
        return;
      };
      onProjectCreated();
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        setErrorLabelMessage({
          label: "Validation Error",
          message: error.message,
        });
      }
    }
  };

  return (
    <>
      <div className={styles["side-panel"]}>
        <div className={styles["title-container"]}>
          <h6>Create a project</h6>
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
              className={styles.input}
              required
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
              formatOptionLabel={formatOptionLabel}
            />
          </div>

          <div className={styles.inputContainer}>
            <label>Select Users:</label>
            <Select
              options={userOptions}
              isMulti
              placeholder="Select users (optional)"
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

          {errorLabelMessage && (
            <ErrorMessage errorLabelMessage={errorLabelMessage} />
          )}
        </form>
      </div>
    </>
  );
};

export default ProjectSidePanel;
