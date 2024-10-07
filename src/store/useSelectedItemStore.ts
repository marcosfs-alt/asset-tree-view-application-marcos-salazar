import { Asset, SelectedItemState } from '@/types';
import { create } from 'zustand';

const useSelectedItemStore = create<SelectedItemState>(
  (set: (partial: Partial<SelectedItemState>) => void) => ({
    selectedItem: null,
    setSelectedItem: (asset: Asset) => set({ selectedItem: asset }),
  }),
);

export default useSelectedItemStore;
