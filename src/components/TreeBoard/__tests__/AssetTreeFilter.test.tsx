import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AssetTreeFilter from '../AssetTreeFilter';
import useFilterStore from '@/store/useFilterStore';

jest.mock('@/store/useFilterStore');

describe('AssetTreeFilter Component', () => {
  const mockSetSearchTerm = jest.fn();

  beforeEach(() => {
    (useFilterStore as unknown as jest.Mock).mockReturnValue({
      searchTerm: '',
      setSearchTerm: mockSetSearchTerm,
    });
  });

  it('should render input field', () => {
    render(<AssetTreeFilter />);

    const inputElement = screen.getByPlaceholderText(
      'buscar por locais, ativos, componentes...',
    );
    expect(inputElement).toBeInTheDocument();
  });

  it('should update search term on input change', () => {
    render(<AssetTreeFilter />);

    const inputElement = screen.getByPlaceholderText(
      'buscar por locais, ativos, componentes...',
    );
    fireEvent.change(inputElement, { target: { value: 'Motor' } });

    expect(mockSetSearchTerm).toHaveBeenCalledWith('Motor');
  });
});
