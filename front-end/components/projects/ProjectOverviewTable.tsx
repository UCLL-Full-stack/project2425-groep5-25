import { ProjectOutput } from '@types';
import React from 'react';
import { formatOptionLabel, getColorName } from 'utils/optionFormatters';

type Props = {
    projects: Array<ProjectOutput>;
};

const ProjectOverviewTable: React.FC<Props> = ({ projects }: Props) => {
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
                            <tr key={index} role="button">
                                <td>{project.id}</td>
                                <td className="align-content-center">
                                    {formatOptionLabel({
                                        label: getColorName(project.color as string),
                                        value: project.color as string,
                                    })}
                                </td>
                                <td>{project.name}</td>
                                <td>{project.users?.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default ProjectOverviewTable;
