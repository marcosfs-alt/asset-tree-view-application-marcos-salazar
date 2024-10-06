import Link from 'next/link';

const ButtonCompany = ({
  companyName,
  companyId,
}: {
  companyName: string;
  companyId: string;
}) => {
  return (
    <Link
      href={`/${companyId}`}
      className="text-white bg-blue900 active:bg-blue500 lg:w-[95px] lg:h-[24px] lg:font-semibold lg:text-xs lg:py-1 lg:px-4 lg:rounded-sm"
    >
      {companyName}
    </Link>
  );
};

export default ButtonCompany;
