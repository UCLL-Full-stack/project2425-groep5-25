import React from "react";
import { ProjectUserCountDto } from "@types";
import { formatOptionLabel, hexToColorNameMap } from "utils/optionFormatters";

type Props = {
  projects: Array<ProjectUserCountDto>;
};

const ProjectOverviewTable: React.FC<Props> = ({
  projects,
}: Props) => {
  return (
    <>
      {projects && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Color</th>
              <th scope="col">Name</th>
              <th scope="col">Aantal Gebruikers</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr
                key={index}                
                role="button"
              >
                <td>{project.id}</td>
                <td className="align-content-center">
                  {formatOptionLabel({
                    label: hexToColorNameMap[project.color as string] || "Unknown",
                    value: project.color as string,
                  })}
                </td>
                <td>{project.name}</td>
                <td>{project.userCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ProjectOverviewTable;
