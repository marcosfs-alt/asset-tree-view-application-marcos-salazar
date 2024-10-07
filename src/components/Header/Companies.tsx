'use client';

import { useEffect, useState } from 'react';
import ButtonCompany from './ButtonCompany';
import { Company } from '@/types/Company';
import { fetchCompanies } from '@/services/companiesService';

const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);

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
  }, []);

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
