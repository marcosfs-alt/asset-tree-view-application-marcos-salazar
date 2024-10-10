'use client';

import Companies from '@/components/Header/Companies';
import { useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="w-full h-full flex justify-center flex-col items-center gap-2">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-500">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue500"></div>
        </div>
      )}
      <div className="text-lg text-bold text-black">
        selecione uma empresa para ver seus ativos
      </div>
      <Companies setLoading={() => setIsLoading(true)} />
    </div>
  );
}
