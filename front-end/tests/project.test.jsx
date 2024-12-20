import ProjectOverviewTable from '@components/projects/ProjectOverviewTable';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

const mockProjects = [
    { id: 1, color: 'red', name: 'Project 1', users: [{}, {}] },
    { id: 2, color: 'blue', name: 'Project 2', users: [{}, {}] },
];

test('renders ProjectOverviewTable with projects', () => {
    useRouter.mockImplementation(() => ({
        push: jest.fn(),
        query: {},
    }));

    render(<ProjectOverviewTable projects={mockProjects} />);

    expect(screen.getByText(/id/i)).toBeInTheDocument();
    expect(screen.getByText(/color/i)).toBeInTheDocument();
    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/userCount/i)).toBeInTheDocument();
});

test('clicking a row redirects to the correct project page', () => {
    const push = jest.fn();
    useRouter.mockImplementation(() => ({
        push,
        query: {},
    }));

    render(<ProjectOverviewTable projects={mockProjects} />);

    fireEvent.click(screen.getByText('Project 1'));

    expect(push).toHaveBeenCalledWith('/projects/1');
});
