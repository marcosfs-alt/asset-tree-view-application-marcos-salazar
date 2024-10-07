import { Asset, Company, Location } from '@/types';
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

export const fetchLocations = async (companyId: string) => {
  try {
    const response = await api.get<Location[]>(
      `companies/${companyId}/locations`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching locations: ', error);
    return [];
  }
};

export const fetchAssets = async (companyId: string) => {
  try {
    const response = await api.get<Asset[]>(`companies/${companyId}/assets`);
    return response.data;
  } catch (error) {
    console.error('error fetching assets: ', error);
    return [];
  }
};
