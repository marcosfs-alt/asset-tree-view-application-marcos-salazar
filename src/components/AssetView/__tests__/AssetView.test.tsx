import React from 'react';
import { render, screen } from '@testing-library/react';
import AssetView from '../AssetView';
import useSelectedItemStore from '@/store/useSelectedItemStore';

jest.mock('@/store/useSelectedItemStore');

describe('AssetView Component', () => {
  it('should render the selected asset details', () => {
    const mockSelectedItem = {
      id: '1',
      name: 'Motor XYZ',
      sensorId: 'SENSOR123',
      sensorType: 'vibration',
      status: 'operating',
    };

    (useSelectedItemStore as unknown as jest.Mock).mockReturnValue({
      selectedItem: mockSelectedItem,
    });

    render(<AssetView />);

    expect(screen.getByText('Motor XYZ')).toBeInTheDocument();
    const equipElement = screen.getAllByText('Tipo do Equipamento')[1];
    expect(equipElement).toBeInTheDocument();
    expect(screen.getByText('Responsável')).toBeInTheDocument();
    const xyzEngine = screen.getAllByText('motor xyz')[1];
    expect(xyzEngine).toBeInTheDocument();
    expect(screen.getByText('Sensor')).toBeInTheDocument();
    const sensorElement = screen.getAllByText('SENSOR123')[1];
    expect(sensorElement).toBeInTheDocument();
  });

  it('should render placeholder when no asset is selected', () => {
    (useSelectedItemStore as unknown as jest.Mock).mockReturnValue({
      selectedItem: null,
    });

    render(<AssetView />);

    expect(screen.queryByText('Tipo do Equipamento')).not.toBeInTheDocument();
  });
});
