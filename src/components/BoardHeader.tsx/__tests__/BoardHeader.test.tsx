import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BoardHeader from '../BoardHeader';
import useCompanyStore from '@/store/useCompanyStore';
import useFilterStore from '@/store/useFilterStore';

jest.mock('@/store/useCompanyStore');
jest.mock('@/store/useFilterStore');

describe('BoardHeader Component', () => {
  const mockSetShowCriticalStatusOnly = jest.fn();
  const mockSetShowEnergySensorsOnly = jest.fn();

  beforeEach(() => {
    (useFilterStore as unknown as jest.Mock).mockReturnValue({
      setShowCriticalStatusOnly: mockSetShowCriticalStatusOnly,
      setShowEnergySensorsOnly: mockSetShowEnergySensorsOnly,
    });
  });

  it('should render company name and buttons', () => {
    (useCompanyStore as unknown as jest.Mock).mockReturnValue({
      companies: [{ id: '1', name: 'Company A' }],
    });

    render(<BoardHeader companyId="1" />);

    expect(screen.getByText('Ativos')).toBeInTheDocument();
    expect(screen.getByText('/ Company A')).toBeInTheDocument();

    expect(
      screen.getByText((content, element) => {
        return element?.textContent === 'sensor de energia';
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText((content, element) => {
        return element?.textContent === 'critico';
      }),
    ).toBeInTheDocument();
  });

  it('should handle energy button click', () => {
    (useCompanyStore as unknown as jest.Mock).mockReturnValue({
      companies: [{ id: '1', name: 'Company A' }],
    });

    render(<BoardHeader companyId="1" />);

    const energyButton = screen.getByText('sensor de energia');
    fireEvent.click(energyButton);

    expect(mockSetShowEnergySensorsOnly).toHaveBeenCalledWith(true);
  });

  it('should handle critical button click', () => {
    (useCompanyStore as unknown as jest.Mock).mockReturnValue({
      companies: [{ id: '1', name: 'Company A' }],
    });

    render(<BoardHeader companyId="1" />);

    const criticalButton = screen.getByText('critico');
    fireEvent.click(criticalButton);

    expect(mockSetShowCriticalStatusOnly).toHaveBeenCalledWith(true);
  });
});
