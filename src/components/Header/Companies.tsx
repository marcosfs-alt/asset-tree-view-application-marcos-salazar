import ButtonCompany from './ButtonCompany';

const Companies = () => {
  const companies = [
    { id: 'apex-unit', name: 'Apex Unit' },
    { id: 'tobias-unit', name: 'Tobias Unit' },
    { id: 'jaguar-unit', name: 'Jaguar Unit' },
  ]; //mock

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
