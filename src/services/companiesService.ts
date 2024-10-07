import { Company } from '@/types';
import api from '@/utils/api';

export const fetchCompanies = async (): Promise<Company[]> => {
  try {
    const response = await api.get<Company[]>('/companies');
    return response.data;
  } catch (error) {
    console.error('Error fetching companies: ', error);
    return [];
  }
};
