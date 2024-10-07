import Link from 'next/link';
import CompanyIcon from '@/../../public/assets/icons/company.svg';
import { useSelectedLayoutSegments } from 'next/navigation';

const ButtonCompany = ({
  companyName,
  companyId,
}: {
  companyName: string;
  companyId: string;
}) => {
  const segments = useSelectedLayoutSegments();
  const isActive: boolean = segments.includes(companyId);

  return (
    <Link
      href={`/company/${companyId}`}
      className={`text-white bg-blue900 lg:w-[95px] lg:h-[24px] lg:font-semibold lg:text-xs lg:py-1 lg:px-4 lg:rounded-sm flex justify-center items-center gap-x-2 hover:bg-blue500 ${isActive ? 'bg-blue500' : ''}`}
    >
      <CompanyIcon />
      {companyName}
    </Link>
  );
};

export default ButtonCompany;
