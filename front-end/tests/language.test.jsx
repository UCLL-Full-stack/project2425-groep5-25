import Language from '@components/language/Language';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

test('renders language select with correct options', () => {
    useRouter.mockReturnValue({
        locale: 'en',
        pathname: '/',
        asPath: '/',
        query: {},
    });

    render(<Language />);
    expect(screen.getByText('English'));
});

test('displays all dropdown items with expected text', () => {
    useRouter.mockReturnValue({
        locale: 'en',
        pathname: '/',
        asPath: '/',
        query: {},
    });

    render(<Language />);

    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);

    expect(screen.getByRole('option', { name: 'English' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Türkçe' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Nederlands' })).toBeInTheDocument();
});
