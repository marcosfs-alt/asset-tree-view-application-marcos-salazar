export default function Page({ params }: { params: { companyId: string } }) {
  return <div className="text-xl text-black">My Post: {params.companyId}</div>;
}
