import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Companies from '../Companies';
import { fetchCompanies } from '@/services/companiesService';

jest.mock('next/navigation', () => ({
  useSelectedLayoutSegments: jest.fn().mockReturnValue([]),
}));

jest.mock('@/services/companiesService', () => ({
  fetchCompanies: jest.fn(),
}));

describe('Companies Component', () => {
  it('should render the list of companies correctly', async () => {
    (fetchCompanies as jest.Mock).mockResolvedValue([
      { id: 'apex-unit', name: 'Apex Unit' },
      { id: 'tobias-unit', name: 'Tobias Unit' },
    ]);

    render(<Companies />);

    await waitFor(() => {
      const apexLink = screen.getByRole('link', { name: /Apex Unit/i });
      const tobiasLink = screen.getByRole('link', { name: /Tobias Unit/i });

      expect(apexLink).toBeInTheDocument();
      expect(tobiasLink).toBeInTheDocument();
    });
  });
});
