import { Company } from '@/types';
import { SelectedCompany } from '@/types/SelectedCompany';
import { create } from 'zustand';

const useCompanyStore = create<SelectedCompany>((set) => ({
  companies: [],
  setCompanies: (companies: Company[]) => set({ companies: companies }),
}));

export default useCompanyStore;
