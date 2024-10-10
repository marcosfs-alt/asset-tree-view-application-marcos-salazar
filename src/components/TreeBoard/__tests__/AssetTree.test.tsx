import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AssetTree from '../AssetTree';
import useSelectedItemStore from '@/store/useSelectedItemStore';
import useFilterStore from '@/store/useFilterStore';

jest.mock('@/store/useSelectedItemStore');
jest.mock('@/store/useFilterStore');

describe('AssetTree Component', () => {
  const mockSetSelectedItem = jest.fn();

  beforeEach(() => {
    (useSelectedItemStore as unknown as jest.Mock).mockReturnValue({
      selectedItem: null,
      setSelectedItem: mockSetSelectedItem,
    });

    (useFilterStore as unknown as jest.Mock).mockReturnValue({
      searchTerm: '',
      showEnergySensorsOnly: false,
      showCriticalStatusOnly: false,
    });
  });

  const locations = [
    { id: 'loc1', name: 'Location1', parentId: undefined },
    { id: 'loc2', name: 'Location2', parentId: 'loc1' },
  ];

  const assets = [
    { id: 'asset1', name: 'Asset1', locationId: 'loc2', parentId: undefined },
    {
      id: 'asset2',
      name: 'Asset2',
      parentId: 'asset1',
      sensorType: 'vibration',
      status: 'operating',
    },
  ];

  it('should render the tree structure correctly', () => {
    render(<AssetTree locations={locations} assets={assets} />);

    expect(screen.getByTestId('treenode-Location1')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('treenode-Location1'));

    setTimeout(() => {
      expect(screen.getByTestId('treenode-Location2')).toBeInTheDocument();
      fireEvent.click(screen.getByTestId('treenode-Location2'));
      expect(screen.getByTestId('treenode-Asset1')).toBeInTheDocument();
      expect(screen.getByTestId('treenode-Asset2')).toBeInTheDocument();
    }, 500);
  });
});
