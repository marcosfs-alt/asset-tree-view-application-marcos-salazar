// src/store/useFilterStore.ts
import { AssetTreeFilterProps } from '@/types';
import { create } from 'zustand';

const useFilterStore = create<AssetTreeFilterProps>((set) => ({
  searchTerm: '',
  showEnergySensorsOnly: false,
  showCriticalStatusOnly: false,
  setSearchTerm: (term) => set({ searchTerm: term }),
  setShowEnergySensorsOnly: (show) => set({ showEnergySensorsOnly: show }),
  setShowCriticalStatusOnly: (show) => set({ showCriticalStatusOnly: show }),
}));

export default useFilterStore;
