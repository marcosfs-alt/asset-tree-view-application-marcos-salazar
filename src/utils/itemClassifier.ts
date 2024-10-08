import { Location, Asset } from '@/types';

export function getItemType(
  item: Location | Asset,
): 'location' | 'asset' | 'component' {
  if ('sensorType' in item && item.sensorType) {
    return 'component';
  } else if ('locationId' in item || 'parentId' in item) {
    return 'asset';
  } else {
    return 'location';
  }
}
