import ColorSelectField from "@components/Selects/ColorSelectField";
import InputField from "@components/Selects/InputField";
import UserSelectField from "@components/Selects/UserSelectField";
import ErrorMessage from "@components/shared/ErrorMessage";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { projectService } from "@services/ProjectService";
import { userService } from "@services/UserService";
import styles from "@styles/ProjectSidePanel.module.css";
import {
  Color,
  ErrorLabelMessage,
  IdName,
  ProjectInput,
  ProjectOutput,
  ProjectToUserInput,
} from "@types";
import React, { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  userIdNames: Array<IdName>;
  addProject: (project: ProjectOutput) => void;
  onProjectCreated: () => void;
  onClose: () => void;
};

const ProjectSidePanel: React.FC<Props> = ({
  userIdNames,
  addProject,
  onProjectCreated,
  onClose,
}: Props) => {
  const [name, setName] = useState<string | null>(null);
  const [color, setColor] = useState<Color | null>(null);
  const [userIds, setUserIds] = useState<number[]>([]);
  const [showUserSelector, setShowUserSelector] = useState<boolean>(false);
  const [errorLabelMessage, setErrorLabelMessage] =
    useState<ErrorLabelMessage>();

  const validateName = (name: string | null) => {
    if (!name || name?.trim().length < 6)
      return "Project name must be at least 6 characters long";
    return null;
  };

  const validateColor = (color: Color | null) => {
    if (!color || !Object.values(Color).includes(color))
      return "Please select a valid project color.";
    return null;
  };

  const validateUserSelection = (value: number[]) => {
    const uniqueUserIds = new Set(value);
    if (uniqueUserIds.size !== value.length)
      return "You cannot select the same user more than once.";
    return null;
  };

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorLabelMessage(undefined);

    const nameError = validateName(name);
    const colorError = validateColor(color);
    const userError = showUserSelector ? validateUserSelection(userIds) : null;

    if (nameError || colorError || userError) {
      setErrorLabelMessage({
        label: "Validation Error",
        message: nameError || colorError || userError || "",
      });
      return;
    }

    try {
      const projectFormData: ProjectInput = { name: name!, color: color! };
      const [projectResponse] = await Promise.all([
        projectService.createProject(projectFormData),
      ]);
      const [projectJson] = await Promise.all([projectResponse.json()]);

      if (!projectResponse.ok)
        throw new Error(
          projectJson.message || "An error occurred while creating the project."
        );

      if (showUserSelector && userIds.length > 0) {
        const userFormData: ProjectToUserInput = {
          projectId: projectJson.id,
          userIds,
        };
        const [userResponse] = await Promise.all([
          userService.enrollProject(userFormData),
        ]);
        const [userJson] = await Promise.all([userResponse.json()]);

        if (!userResponse.ok)
          throw new Error(
            userJson.message ||
              "An error occurred while enrolling users in the project."
          );
      }

      onProjectCreated();
      toast.success(
        `Project ${
          showUserSelector && userIds.length > 0 ? "with users" : ""
        } was created successfully!`
      );
      onClose();

      addProject({
        id: projectJson.id,
        name: projectJson.name,
        color: projectJson.color,
      });
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
          <InputField
            type="text"
            label="Project Name:"
            value={name}
            onChange={setName}
            validate={validateName}
            placeholder="Enter name"
            required
          />

          <ColorSelectField
            label="Select Color:"
            value={color}
            onChange={setColor}
            validate={validateColor}
            placeholder="Select a color"
            required
          />

          {!showUserSelector ? (
            <button
              type="button"
              className={styles.button}
              onClick={() => setShowUserSelector(true)}
            >
              Want to add users?
            </button>
          ) : (
            <UserSelectField
              label="Select Users:"
              userIdNames={userIdNames}
              value={userIds}
              onChange={setUserIds}
              validate={validateUserSelection}
              placeholder="Select users (optional)"
              required={false}
            />
          )}

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
