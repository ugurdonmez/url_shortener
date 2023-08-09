import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UrlInput from './UrlInput';

describe('<UrlInput />', () => {

    it('displays the provided value in the text input', () => {
        const mockValue = 'https://www.example.com';
        render(<UrlInput value={mockValue} onChange={jest.fn()} handleSubmit={jest.fn()} />);

        const input = screen.getByDisplayValue(mockValue);
        expect(input).toBeInTheDocument();
    });

    it('calls the provided onChange handler when the text input value changes', () => {
        const mockOnChange = jest.fn();
        render(<UrlInput value='' onChange={mockOnChange} handleSubmit={jest.fn()} />);

        const input = screen.getByLabelText('Enter the link here');
        fireEvent.change(input, { target: { value: 'https://www.changed.com' } });

        expect(mockOnChange).toHaveBeenCalled();
    });

    it('calls the provided handleSubmit handler when the "Shorten" button is clicked', () => {
        const mockHandleSubmit = jest.fn();
        render(<UrlInput value='' onChange={jest.fn()} handleSubmit={mockHandleSubmit} />);

        const button = screen.getByText('Shorten');
        fireEvent.click(button);

        expect(mockHandleSubmit).toHaveBeenCalled();
    });
});
