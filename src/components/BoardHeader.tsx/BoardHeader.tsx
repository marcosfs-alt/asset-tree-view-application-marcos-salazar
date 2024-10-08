'use client';

import useCompanyStore from '@/store/useCompanyStore';

const BoardHeader = ({ companyId }: { companyId: string }) => {
  const { companies } = useCompanyStore();

  const selectedCompany = companies.find((company) => company.id === companyId);

  return (
    <div className="flex items-center justify-between text-black600">
      <span className="text-center">
        <h1 className="text-xl text-gray950 font-semibold inline">Ativos</h1>
        <p className="text-sm text-gray600 inline">
          {' '}
          / {selectedCompany?.name}
        </p>
      </span>
      <span className="flex gap-2">
        <div className="w-[175px] h-[32px] bg-white flex items-center justify-center rounded-[3px] text-gray600 border border-card cursor-pointer">
          sensor de energia
        </div>
        <div className="w-[98px] h-[32px] bg-white flex items-center justify-center rounded-[3px] text-gray600 border border-card cursor-pointer">
          critico
        </div>
      </span>
    </div>
  );
};

export default BoardHeader;
