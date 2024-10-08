import { Company } from '.';

export interface SelectedCompany {
  companies: Company[];
  setCompanies: (companies: Company[]) => void;
}
