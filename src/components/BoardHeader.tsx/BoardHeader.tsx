'use client';

import useCompanyStore from '@/store/useCompanyStore';
import useSelectedItemStore from '@/store/useSelectedItemStore';
import { sensorStatus, sensorTypes } from '@/types';
import Bolt from '@/../../public/assets/icons/boltOutlined.svg';
import Alert from '@/../../public/assets/icons/alert.svg';

const BoardHeader = ({ companyId }: { companyId: string }) => {
  const { companies } = useCompanyStore();
  const { selectedItem } = useSelectedItemStore();

  const [energyItem, criticalStatus] = [
    selectedItem?.sensorType === sensorTypes.E,
    selectedItem?.status === sensorStatus.ALT,
  ];
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
        <div
          className={`w-[175px] h-[32px] ${!energyItem ? 'bg-white' : 'bg-blue500 text-white'} flex items-center justify-center rounded-[3px] text-gray600 border border-card cursor-pointer gap-0.5`}
        >
          <Bolt className={`${!energyItem ? 'fill-blue500' : 'fill-white'}`} />{' '}
          sensor de energia
        </div>
        <div
          className={`w-[98px] h-[32px] ${!criticalStatus ? 'bg-white' : 'bg-blue500 text-white'} flex items-center justify-center rounded-[3px] text-gray600 border border-card cursor-pointer gap-1`}
        >
          <Alert
            className={`${!criticalStatus ? 'fill-blue500' : 'fill-white'}`}
          />{' '}
          critico
        </div>
      </span>
    </div>
  );
};

export default BoardHeader;
