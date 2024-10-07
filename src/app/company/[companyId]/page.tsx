import AssetTree from '@/components/TreeBoard/AssetTree';
import { fetchAssets, fetchLocations } from '@/services/companiesService';

export default async function Page({
  params,
}: {
  params: { companyId: string };
}) {
  const { companyId } = params;

  const locations = await fetchLocations(companyId);
  const assets = await fetchAssets(companyId);

  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <div className="flex flex-col border-2 border-borderCard rounded lg:w-full lg:h-full p-4 gap-y-3 overflow-hidden">
        <div className="flex items-center justify-between text-black600">
          <span className="text-center">
            <h1 className="text-xl text-gray950 font-semibold inline">
              Ativos
            </h1>
            <p className="text-sm text-gray600 inline"> / {companyId}</p>
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
        <section className="flex gap-2 w-full h-full overflow-hidden">
          <section className="border border-borderCard w-1/3 h-full text-black overflow-scroll">
            <AssetTree locations={locations} assets={assets} />
          </section>
          <section className="border border-borderCard w-2/3 h-full"></section>
        </section>
      </div>
    </div>
  );
}
