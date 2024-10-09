import { Asset, Location } from '.';

export interface IndexedData {
  [key: string]: {
    locations: Location[];
    assets: Asset[];
  };
}
