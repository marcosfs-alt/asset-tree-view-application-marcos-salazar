'use client';

import useFilterStore from '@/store/useFilterStore';

const AssetTreeFilter = () => {
  const { searchTerm, setSearchTerm } = useFilterStore();

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="buscar por locais, ativos, componentes..."
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default AssetTreeFilter;
