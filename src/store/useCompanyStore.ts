import { Company, SelectedCompany } from '@/types';
import { create } from 'zustand';

const useCompanyStore = create<SelectedCompany>((set) => ({
  companies: [],
  setCompanies: (companies: Company[]) => set({ companies: companies }),
}));

export default useCompanyStore;
