import { SelectedItemState } from '@/types';
import { create } from 'zustand';

const useSelectedItemStore = create<SelectedItemState>(
  (set: (partial: Partial<SelectedItemState>) => void) => ({
    selectedItem: null,
    setSelectedItem: (itemId: string) => set({ selectedItem: itemId }),
  }),
);

export default useSelectedItemStore;
