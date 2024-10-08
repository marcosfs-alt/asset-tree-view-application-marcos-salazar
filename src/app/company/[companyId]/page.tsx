import AssetView from '@/components/AssetView/AssetView';
import BoardHeader from '@/components/BoardHeader.tsx/BoardHeader';
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
        <BoardHeader companyId={companyId} />
        <section className="flex gap-2 w-full h-full overflow-hidden">
          <section className="border border-borderCard w-1/3 h-full text-black overflow-scroll">
            <AssetTree locations={locations} assets={assets} />
          </section>
          <section className="border border-borderCard w-2/3 h-full">
            <AssetView />
          </section>
        </section>
      </div>
    </div>
  );
}
