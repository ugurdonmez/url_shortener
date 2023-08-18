import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import UrlInput from '../../src/components/UrlInput';

describe('UrlInput component', () => {
    const onChangeMock = jest.fn();
    const handleSubmitMock = jest.fn();

    beforeEach(() => {
        render(<UrlInput value="" onChange={onChangeMock} handleSubmit={handleSubmitMock} />);
    });

    it('renders without crashing', () => {
        const textField = screen.getByLabelText(/Enter the link here/i);
        expect(textField).toBeInTheDocument();
    });

    it('displays an error for an invalid URL', () => {
        const textField = screen.getByLabelText(/Enter the link here/i);
        const button = screen.getByRole('button');

        fireEvent.change(textField, { target: { value: 'invalidURL' } });
        fireEvent.click(button);

        const errorText = screen.getByText(/Please enter a valid URL./i);
        expect(errorText).toBeInTheDocument();
    });
});
