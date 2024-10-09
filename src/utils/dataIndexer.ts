import { Asset, Location as AssetLocation } from '@/types';
import { IndexedData } from '@/types/IndexedData';

export function createDataIndex(
  locations: AssetLocation[],
  assets: Asset[],
): IndexedData {
  const index: IndexedData = {};

  locations.forEach((location: AssetLocation) => {
    if (!index[location.parentId || 'root']) {
      index[location.parentId || 'root'] = { locations: [], assets: [] };
    }
    index[location.parentId || 'root'].locations.push(location);
  });

  assets.forEach((asset) => {
    const key = asset.parentId || asset.locationId || 'root';
    if (!index[key]) {
      index[key] = { locations: [], assets: [] };
    }
    index[key].assets.push(asset);
  });

  return index;
}
