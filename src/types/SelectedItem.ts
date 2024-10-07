import { Asset } from '.';

export interface SelectedItemState {
  selectedItem: Asset | null;
  setSelectedItem: (asset: Asset) => void;
}
