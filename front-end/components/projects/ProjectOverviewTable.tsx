import { ProjectUserCountDto } from "@types";
import React from "react";

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
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: String(project.color),
                    }}
                  />
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
