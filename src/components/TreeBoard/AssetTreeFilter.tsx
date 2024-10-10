'use client';

import useFilterStore from '@/store/useFilterStore';
import { useRef } from 'react';
import SearchIcon from '@/../../public/assets/icons/Search.svg';

const AssetTreeFilter = () => {
  const { searchTerm, setSearchTerm } = useFilterStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className="relative mb-2.5 rounded-sm w-full border border-gray-300"
      onClick={handleDivClick}
    >
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="buscar por locais, ativos, componentes..."
        className="w-full p-2 pr-10 rounded-sm focus:outline-none"
      />
      <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
  );
};

export default AssetTreeFilter;
