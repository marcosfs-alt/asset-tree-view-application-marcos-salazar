import React from 'react';
import { render } from '@testing-library/react';
import ButtonCompany from '../ButtonCompany';
import { useSelectedLayoutSegments } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useSelectedLayoutSegments: jest.fn(),
}));

describe('ButtonCompany Component', () => {
  it('should render company name and link correctly', () => {
    (useSelectedLayoutSegments as jest.Mock).mockReturnValue([]);

    const { getByRole } = render(
      <ButtonCompany companyName="Apex Unit" companyId="apex-unit" />
    );

    const linkElement = getByRole('link', { name: /Apex Unit/i });
    expect(linkElement).toHaveAttribute('href', '/company/apex-unit');
  });

  it('should have active class when selected', () => {
    (useSelectedLayoutSegments as jest.Mock).mockReturnValue(['apex-unit']);

    const { getByRole } = render(
      <ButtonCompany companyName="Apex Unit" companyId="apex-unit" />
    );

    const linkElement = getByRole('link', { name: /Apex Unit/i });
    expect(linkElement).toHaveClass('bg-blue500');
  });
});
