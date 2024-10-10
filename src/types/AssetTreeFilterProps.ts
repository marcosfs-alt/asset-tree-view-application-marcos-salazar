export interface AssetTreeFilterProps {
  searchTerm: string;
  showEnergySensorsOnly: boolean;
  showCriticalStatusOnly: boolean;
  setSearchTerm: (term: string) => void;
  setShowEnergySensorsOnly: (show: boolean) => void;
  setShowCriticalStatusOnly: (show: boolean) => void;
}
