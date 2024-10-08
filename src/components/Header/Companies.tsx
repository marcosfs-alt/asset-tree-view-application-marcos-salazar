'use client';

import { useEffect } from 'react';
import ButtonCompany from './ButtonCompany';
import { fetchCompanies } from '@/services/companiesService';
import useCompanyStore from '@/store/useCompanyStore';

const Companies = () => {
  const { companies, setCompanies } = useCompanyStore();

  useEffect(() => {
    const getCompanies = async () => {
      const cachedCompanies = localStorage.getItem('companies');

      if (cachedCompanies) {
        setCompanies(JSON.parse(cachedCompanies));
      }

      const data = await fetchCompanies();
      setCompanies(data);

      localStorage.setItem('companies', JSON.stringify(data));
    };
    getCompanies();
  }, [setCompanies]);

  return (
    <nav className="w-fit">
      <ul className="flex justify-around lg:gap-2">
        {companies.map((company) => (
          <li key={company.id}>
            <ButtonCompany companyName={company.name} companyId={company.id} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Companies;
