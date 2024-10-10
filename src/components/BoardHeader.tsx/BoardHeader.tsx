'use client';

import useCompanyStore from '@/store/useCompanyStore';
import Bolt from '@/../../public/assets/icons/boltOutlined.svg';
import Alert from '@/../../public/assets/icons/alert.svg';
import useFilterStore from '@/store/useFilterStore';
import { useState } from 'react';

enum buttonType {
  e = 'energy',
  c = 'critical',
}

const BoardHeader = ({ companyId }: { companyId: string }) => {
  const { companies } = useCompanyStore();
  const [selectedFilter, setSelectedFilter] = useState<{
    energyButton: boolean;
    criticalButton: boolean;
  }>({ energyButton: false, criticalButton: false });
  const { setShowCriticalStatusOnly, setShowEnergySensorsOnly } =
    useFilterStore();

  const handleClick = ({ type }: { type: buttonType }) => {
    setSelectedFilter((current) => {
      if (type === buttonType.e) {
        const newEnergyButtonState = !current.energyButton;
        setShowEnergySensorsOnly(newEnergyButtonState);
        return {
          ...current,
          energyButton: newEnergyButtonState,
        };
      } else {
        const newCriticalButtonState = !current.criticalButton;
        setShowCriticalStatusOnly(newCriticalButtonState);
        return {
          ...current,
          criticalButton: newCriticalButtonState,
        };
      }
    });
  };

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
        <button
          className={`w-[175px] h-[32px] ${!selectedFilter.energyButton ? 'bg-white' : 'bg-blue500 text-white'} flex items-center justify-center rounded-[3px] text-gray600 border border-card cursor-pointer gap-0.5`}
          onClick={() => handleClick({ type: buttonType.e })}
          data-testid="energyButton"
        >
          <Bolt
            className={`${!selectedFilter.energyButton ? 'fill-blue500' : 'fill-white'}`}
          />{' '}
          <p>sensor de energia</p>
        </button>
        <button
          className={`w-[98px] h-[32px] ${!selectedFilter.criticalButton ? 'bg-white' : 'bg-blue500 text-white'} flex items-center justify-center rounded-[3px] text-gray600 border border-card cursor-pointer gap-1`}
          onClick={() => handleClick({ type: buttonType.c })}
          data-testid="criticalButton"
        >
          <Alert
            className={`${!selectedFilter.criticalButton ? 'fill-blue500' : 'fill-white'}`}
          />{' '}
          <span>critico</span>
        </button>
      </span>
    </div>
  );
};

export default BoardHeader;
